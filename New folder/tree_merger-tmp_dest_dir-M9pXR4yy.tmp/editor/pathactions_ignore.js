// TODO: Migrate all of this code into path.js
// Group: Path edit functions
// Functions relating to editing path elements
pathActions = canvas.pathActions = function() {
    
    var subpath = false;
    var current_path;
    var newPoint, firstCtrl;
    
    function resetD(p) {
        p.setAttribute("d", pathActions.convertPath(p));
    }

    // TODO: Move into path.js
    svgedit.path.Path.prototype.endChanges = function(text) {
        if (svgedit.browser.isWebkit()) {resetD(this.elem);}
        var cmd = new svgedit.history.ChangeElementCommand(this.elem, {d: this.last_d}, text);
        addCommandToHistory(cmd);
        call("changed", [this.elem]);
    };

    svgedit.path.Path.prototype.addPtsToSelection = function(indexes) {
        var i, seg;
        if (!$.isArray(indexes)) {indexes = [indexes];}
        for (i = 0; i< indexes.length; i++) {
            var index = indexes[i];
            seg = this.segs[index];
            if (seg.ptgrip) {
                if (this.selected_pts.indexOf(index) == -1 && index >= 0) {
                    this.selected_pts.push(index);
                }
            }
        }
        this.selected_pts.sort();
        i = this.selected_pts.length;
        var grips = new Array(i);
        // Loop through points to be selected and highlight each
        while (i--) {
            var pt = this.selected_pts[i];
            seg = this.segs[pt];
            seg.select(true);
            grips[i] = seg.ptgrip;
        }
        // TODO: Correct this:
        pathActions.canDeleteNodes = true;
        
        pathActions.closed_subpath = this.subpathIsClosed(this.selected_pts[0]);
        
        call("selected", grips);
    };

    current_path = null;
    var drawn_path = null,
        hasMoved = false;
    
    // This function converts a polyline (created by the fh_path tool) into
    // a path element and coverts every three line segments into a single bezier
    // curve in an attempt to smooth out the free-hand
    var smoothPolylineIntoPath = function(element) {
        var i, points = element.points;
        var N = points.numberOfItems;
        if (N >= 4) {
            // loop through every 3 points and convert to a cubic bezier curve segment
            // 
            // NOTE: this is cheating, it means that every 3 points has the potential to 
            // be a corner instead of treating each point in an equal manner. In general,
            // this technique does not look that good.
            // 
            // I am open to better ideas!
            // 
            // Reading:
            // - http://www.efg2.com/Lab/Graphics/Jean-YvesQueinecBezierCurves.htm
            // - http://www.codeproject.com/KB/graphics/BezierSpline.aspx?msg=2956963
            // - http://www.ian-ko.com/ET_GeoWizards/UserGuide/smooth.htm
            // - http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
            var curpos = points.getItem(0), prevCtlPt = null;
            var d = [];
            d.push(["M", curpos.x, ",", curpos.y, " C"].join(""));
            for (i = 1; i <= (N-4); i += 3) {
                var ct1 = points.getItem(i);
                var ct2 = points.getItem(i+1);
                var end = points.getItem(i+2);
                
                // if the previous segment had a control point, we want to smooth out
                // the control points on both sides
                if (prevCtlPt) {
                    var newpts = svgedit.path.smoothControlPoints( prevCtlPt, ct1, curpos );
                    if (newpts && newpts.length == 2) {
                        var prevArr = d[d.length-1].split(',');
                        prevArr[2] = newpts[0].x;
                        prevArr[3] = newpts[0].y;
                        d[d.length-1] = prevArr.join(',');
                        ct1 = newpts[1];
                    }
                }
                
                d.push([ct1.x, ct1.y, ct2.x, ct2.y, end.x, end.y].join(','));
                
                curpos = end;
                prevCtlPt = ct2;
            }
            // handle remaining line segments
            d.push("L");
            while (i < N) {
                var pt = points.getItem(i);
                d.push([pt.x, pt.y].join(","));
                i++;
            }
            d = d.join(" ");

            // create new path element
            element = addSvgElementFromJson({
                "element": "path",
                "curStyles": true,
                "attr": {
                    "id": getId(),
                    "d": d,
                    "fill": "none"
                }
            });
            // No need to call "changed", as this is already done under mouseUp
        }
        return element;
    };

    return {
        mouseDown: function(evt, mouse_target, start_x, start_y) {
            var id;
            if (current_mode === "path") {
                mouse_x = start_x;
                mouse_y = start_y;
                
                var x = mouse_x/current_zoom,
                    y = mouse_y/current_zoom,
                    stretchy = svgedit.utilities.getElem("path_stretch_line");
                newPoint = [x, y];  
                
                if (curConfig.gridSnapping){
                    x = svgedit.utilities.snapToGrid(x);
                    y = svgedit.utilities.snapToGrid(y);
                    mouse_x = svgedit.utilities.snapToGrid(mouse_x);
                    mouse_y = svgedit.utilities.snapToGrid(mouse_y);
                }

                if (!stretchy) {
                    stretchy = document.createElementNS(NS.SVG, "path");
                    svgedit.utilities.assignAttributes(stretchy, {
                        'id': "path_stretch_line",
                        'stroke': "#22C",
                        'stroke-width': "0.5",
                        'fill': 'none'
                    });
                    stretchy = svgedit.utilities.getElem("selectorParentGroup").appendChild(stretchy);
                }
                stretchy.setAttribute("display", "inline");
                
                var keep = null;
                var index;
                // if pts array is empty, create path element with M at current point
                if (!drawn_path) {
                    d_attr = "M" + x + "," + y + " ";
                    drawn_path = addSvgElementFromJson({
                        "element": "path",
                        "curStyles": true,
                        "attr": {
                            "d": d_attr,
                            "id": getNextId(),
                            "opacity": cur_shape.opacity / 2
                        }
                    });
                    // set stretchy line to first point
                    stretchy.setAttribute('d', ['M', mouse_x, mouse_y, mouse_x, mouse_y].join(' '));
                    index = subpath ? svgedit.path.path.segs.length : 0;
                  //  svgedit.path.addPointGrip(index, mouse_x, mouse_y);
                } else {
                    // determine if we clicked on an existing point
                    var seglist = drawn_path.pathSegList;
                    var i = seglist.numberOfItems;
                    var FUZZ = 6/current_zoom;
                    var clickOnPoint = false;
                    while (i) {
                        i --;
                        var item = seglist.getItem(i);
                        var px = item.x, py = item.y;
                        // found a matching point
                        if ( x >= (px-FUZZ) && x <= (px+FUZZ) && y >= (py-FUZZ) && y <= (py+FUZZ) ) {
                            clickOnPoint = true;
                            break;
                        }
                    }
                    
                    // get path element that we are in the process of creating
                    id = getId();
                
                    // Remove previous path object if previously created
                    svgedit.path.removePath_(id);
                    
                    var newpath = svgedit.utilities.getElem(id);
                    var newseg;
                    var s_seg;
                    var len = seglist.numberOfItems;
                    // if we clicked on an existing point, then we are done this path, commit it
                    // (i, i+1) are the x,y that were clicked on
                    if (clickOnPoint) {
                        // if clicked on any other point but the first OR
                        // the first point was clicked on and there are less than 3 points
                        // then leave the path open
                        // otherwise, close the path
                        if (i <= 1 && len >= 2) {
                            // Create end segment
                            var abs_x = seglist.getItem(0).x;
                            var abs_y = seglist.getItem(0).y;
                            

                            s_seg = stretchy.pathSegList.getItem(1);
                            if (true || s_seg.pathSegType === 4) {
                                newseg = drawn_path.createSVGPathSegLinetoAbs(abs_x, abs_y);
                            } else {
                                newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(
                                    abs_x,
                                    abs_y,
                                    s_seg.x1 / current_zoom,
                                    s_seg.y1 / current_zoom,
                                    abs_x,
                                    abs_y
                                );
                            }
                            
                            var endseg = drawn_path.createSVGPathSegClosePath();
                            seglist.appendItem(newseg);
                            seglist.appendItem(endseg);
                        } else if (len < 3) {
                            keep = false;
                            return keep;
                        }
                        $(stretchy).remove();
                        
                        // This will signal to commit the path
                        element = newpath;
                        drawn_path = null;
                        started = false;
                        
                        if (subpath) {
                            if (svgedit.path.path.matrix) {
                                svgedit.coords.remapElement(newpath, {}, svgedit.path.path.matrix.inverse());
                            }
                        
                            var new_d = newpath.getAttribute("d");
                            var orig_d = $(svgedit.path.path.elem).attr("d");
                            $(svgedit.path.path.elem).attr("d", orig_d + new_d);
                            $(newpath).remove();
                            if (svgedit.path.path.matrix) {
                                svgedit.path.recalcRotatedPath();
                            }
                            svgedit.path.path.init();
                            pathActions.toEditMode(svgedit.path.path.elem);
                            svgedit.path.path.selectPt();
                            return false;
                        }
                    }
                    // else, create a new point, update path element
                    else {
                        // Checks if current target or parents are #svgcontent
                        if (!$.contains(container, getMouseTarget(evt))) {
                            // Clicked outside canvas, so don't make point
                            console.log("Clicked outside canvas");
                            return false;
                        }

                        var num = drawn_path.pathSegList.numberOfItems;
                        var last = drawn_path.pathSegList.getItem(num -1);
                        var lastx = last.x, lasty = last.y;

                        if (evt.shiftKey) {
                            var xya = svgedit.math.snapToAngle(lastx, lasty, x, y);
                            x = xya.x;
                            y = xya.y;
                        }
                        
                        // Use the segment defined by stretchy
                        s_seg = stretchy.pathSegList.getItem(1);
                        //EDIT FOR BSC
                        if (true || s_seg.pathSegType === 4) {
                            newseg = drawn_path.createSVGPathSegLinetoAbs(round(x), round(y));
                        } else {
                            newseg = drawn_path.createSVGPathSegCurvetoCubicAbs(
                                round(x),
                                round(y),
                                s_seg.x1 / current_zoom,
                                s_seg.y1 / current_zoom,
                                s_seg.x2 / current_zoom,
                                s_seg.y2 / current_zoom
                            );
                        }
                        
                        drawn_path.pathSegList.appendItem(newseg);
                        
                        x *= current_zoom;
                        y *= current_zoom;
                        
                        // set stretchy line to latest point
                        stretchy.setAttribute('d', ['M', x, y, x, y].join(' '));
                        index = num;
                        if (subpath) {index += svgedit.path.path.segs.length;}
                        svgedit.path.addPointGrip(index, x, y);
                    }
//                  keep = true;
                }
                
                return;
            }
            
            // TODO: Make sure current_path isn't null at this point
            if (!svgedit.path.path) {return;}
            
            svgedit.path.path.storeD();
            
            id = evt.target.id;
            var cur_pt;
            if (id.substr(0,14) == "pathpointgrip_") {
                // Select this point
                cur_pt = svgedit.path.path.cur_pt = parseInt(id.substr(14));
                svgedit.path.path.dragging = [start_x, start_y];
                var seg = svgedit.path.path.segs[cur_pt];
                
                // only clear selection if shift is not pressed (otherwise, add 
                // node to selection)
                if (!evt.shiftKey) {
                    if (svgedit.path.path.selected_pts.length <= 1 || !seg.selected) {
                        svgedit.path.path.clearSelection();
                    }
                    svgedit.path.path.addPtsToSelection(cur_pt);
                } else if (seg.selected) {
                    svgedit.path.path.removePtFromSelection(cur_pt);
                } else {
                    svgedit.path.path.addPtsToSelection(cur_pt);
                }
            } else if (id.indexOf("ctrlpointgrip_") == 0) {
                svgedit.path.path.dragging = [start_x, start_y];
                
                var parts = id.split('_')[1].split('c');
                cur_pt = Number(parts[0]);
                var ctrl_num = Number(parts[1]);
                svgedit.path.path.selectPt(cur_pt, ctrl_num);
            }

            // Start selection box
            if (!svgedit.path.path.dragging) {
                if (rubberBox == null) {
                    rubberBox = selectorManager.getRubberBandBox();
                }
                svgedit.utilities.assignAttributes(rubberBox, {
                        'x': start_x * current_zoom,
                        'y': start_y * current_zoom,
                        'width': 0,
                        'height': 0,
                        'display': 'inline'
                }, 100);
            }
        },
        mouseMove: function(mouse_x, mouse_y) {
            hasMoved = true;
            if (current_mode === "path") {
                if (!drawn_path) {return;}
                var seglist = drawn_path.pathSegList;
                var index = seglist.numberOfItems - 1;
                //BSC
                if (false || newPoint) {
                    // First point
//                  if (!index) {return;}

                    // Set control points
                    var pointGrip1 = svgedit.path.addCtrlGrip('1c1');
                    var pointGrip2 = svgedit.path.addCtrlGrip('0c2');
                    
                    // dragging pointGrip1
                    pointGrip1.setAttribute('cx', mouse_x);
                    pointGrip1.setAttribute('cy', mouse_y);
                    pointGrip1.setAttribute('display', 'inline');

                    var pt_x = newPoint[0];
                    var pt_y = newPoint[1];
                    
                    // set curve
                    var seg = seglist.getItem(index);
                    var cur_x = mouse_x / current_zoom;
                    var cur_y = mouse_y / current_zoom;
                    var alt_x = (pt_x + (pt_x - cur_x));
                    var alt_y = (pt_y + (pt_y - cur_y));
                    
                    pointGrip2.setAttribute('cx', alt_x * current_zoom);
                    pointGrip2.setAttribute('cy', alt_y * current_zoom);
                    pointGrip2.setAttribute('display', 'inline');
                    
                    var ctrlLine = svgedit.path.getCtrlLine(1);
                    svgedit.utilities.assignAttributes(ctrlLine, {
                        x1: mouse_x,
                        y1: mouse_y,
                        x2: alt_x * current_zoom,
                        y2: alt_y * current_zoom,
                        display: 'inline'
                    });

                    if (index === 0) {
                        firstCtrl = [mouse_x, mouse_y];
                    } else {
                        var last = seglist.getItem(index - 1);
                        var last_x = last.x;
                        var last_y = last.y;
    
                        if (last.pathSegType === 6) {
                            last_x += (last_x - last.x2);
                            last_y += (last_y - last.y2);
                        } else if (firstCtrl) {
                            last_x = firstCtrl[0]/current_zoom;
                            last_y = firstCtrl[1]/current_zoom;
                        }
                        //svgedit.path.replacePathSeg(6, index, [pt_x, pt_y, last_x, last_y, alt_x, alt_y], drawn_path);
                    }
                } else {
                    var stretchy = svgedit.utilities.getElem("path_stretch_line");
                    if (stretchy) {
                        var prev = seglist.getItem(index);
                        if (prev.pathSegType === 6) {
                            var prev_x = prev.x + (prev.x - prev.x2);
                            var prev_y = prev.y + (prev.y - prev.y2);
                            svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, prev_x * current_zoom, prev_y * current_zoom, mouse_x, mouse_y], stretchy);                            
                        } else if (firstCtrl) {
                            svgedit.path.replacePathSeg(6, 1, [mouse_x, mouse_y, firstCtrl[0], firstCtrl[1], mouse_x, mouse_y], stretchy);
                        } else {
                            svgedit.path.replacePathSeg(4, 1, [mouse_x, mouse_y], stretchy);
                        }
                    }
                }
                return;
            }
            // if we are dragging a point, let's move it
            if (svgedit.path.path.dragging) {
                var pt = svgedit.path.getPointFromGrip({
                    x: svgedit.path.path.dragging[0],
                    y: svgedit.path.path.dragging[1]
                }, svgedit.path.path);
                var mpt = svgedit.path.getPointFromGrip({
                    x: mouse_x,
                    y: mouse_y
                }, svgedit.path.path);
                var diff_x = mpt.x - pt.x;
                var diff_y = mpt.y - pt.y;
                svgedit.path.path.dragging = [mouse_x, mouse_y];
                
                if (svgedit.path.path.dragctrl) {
                    svgedit.path.path.moveCtrl(diff_x, diff_y);
                } else {
                    svgedit.path.path.movePts(diff_x, diff_y);
                }
            } else {
                svgedit.path.path.selected_pts = [];
                svgedit.path.path.eachSeg(function(i) {
                    var seg = this;
                    if (!seg.next && !seg.prev) {return;}
                        
                    var item = seg.item;
                    var rbb = rubberBox.getBBox();
                    
                    var pt = svgedit.path.getGripPt(seg);
                    var pt_bb = {
                        x: pt.x,
                        y: pt.y,
                        width: 0,
                        height: 0
                    };
                
                    var sel = svgedit.math.rectsIntersect(rbb, pt_bb);

                    this.select(sel);
                    //Note that addPtsToSelection is not being run
                    if (sel) {svgedit.path.path.selected_pts.push(seg.index);}
                });

            }
        }, 
        mouseUp: function(evt, element, mouse_x, mouse_y) {
            
            // Create mode
            if (current_mode === "path") {
                newPoint = null;
                if (!drawn_path) {
                    element = svgedit.utilities.getElem(getId());
                    started = false;
                    firstCtrl = null;
                }

                return {
                    keep: true,
                    element: element
                };
            }
            
            // Edit mode
            
            if (svgedit.path.path.dragging) {
                var last_pt = svgedit.path.path.cur_pt;

                svgedit.path.path.dragging = false;
                svgedit.path.path.dragctrl = false;
                svgedit.path.path.update();
                
                if (hasMoved) {
                    svgedit.path.path.endChanges("Move path point(s)");
                } 
                
                if (!evt.shiftKey && !hasMoved) {
                    svgedit.path.path.selectPt(last_pt);
                } 
            } else if (rubberBox && rubberBox.getAttribute('display') != 'none') {
                // Done with multi-node-select
                rubberBox.setAttribute("display", "none");
                
                if (rubberBox.getAttribute('width') <= 2 && rubberBox.getAttribute('height') <= 2) {
                    pathActions.toSelectMode(evt.target);
                }
                
            // else, move back to select mode   
            } else {
                pathActions.toSelectMode(evt.target);
            }
            hasMoved = false;
        },
        toEditMode: function(element) {
            svgedit.path.path = svgedit.path.getPath_(element);
            current_mode = "pathedit";
            clearSelection();
            svgedit.path.path.show(true).update();
            svgedit.path.path.oldbbox = svgedit.utilities.getBBox(svgedit.path.path.elem);
            subpath = false;
        },
        toSelectMode: function(elem) {
            var selPath = (elem == svgedit.path.path.elem);
            current_mode = "select";
            svgedit.path.path.show(false);
            current_path = false;
            clearSelection();
            
            if (svgedit.path.path.matrix) {
                // Rotated, so may need to re-calculate the center
                svgedit.path.recalcRotatedPath();
            }
            
            if (selPath) {
                call("selected", [elem]);
                addToSelection([elem], true);
            }
        },
        addSubPath: function(on) {
            if (on) {
                // Internally we go into "path" mode, but in the UI it will
                // still appear as if in "pathedit" mode.
                current_mode = "path";
                subpath = true;
            } else {
                pathActions.clear(true);
                pathActions.toEditMode(svgedit.path.path.elem);
            }
        },
        select: function(target) {
            if (current_path === target) {
                pathActions.toEditMode(target);
                current_mode = "pathedit";
            } // going into pathedit mode
            else {
                current_path = target;
            }   
        },
        reorient: function() {
            var elem = selectedElements[0];
            if (!elem) {return;}
            var angle = svgedit.utilities.getRotationAngle(elem);
            if (angle == 0) {return;}
            
            var batchCmd = new svgedit.history.BatchCommand("Reorient path");
            var changes = {
                d: elem.getAttribute('d'),
                transform: elem.getAttribute('transform')
            };
            batchCmd.addSubCommand(new svgedit.history.ChangeElementCommand(elem, changes));
            clearSelection();
            this.resetOrientation(elem);
            
            addCommandToHistory(batchCmd);

            // Set matrix to null
            svgedit.path.getPath_(elem).show(false).matrix = null; 

            this.clear();
    
            addToSelection([elem], true);
            call("changed", selectedElements);
        },
        
        clear: function(remove) {
            current_path = null;
            if (drawn_path) {
                var elem = svgedit.utilities.getElem(getId());
                $(svgedit.utilities.getElem("path_stretch_line")).remove();
                $(elem).remove();
                $(svgedit.utilities.getElem("pathpointgrip_container")).find('*').attr('display', 'none');
                drawn_path = firstCtrl = null;
                started = false;
            } else if (current_mode == "pathedit") {
                this.toSelectMode();
            }
            if (svgedit.path.path) {svgedit.path.path.init().show(false);}
        },
        resetOrientation: function(path) {
            if (path == null || path.nodeName != 'path') {return false;}
            var tlist = svgedit.transformlist.getTransformList(path);
            var m = svgedit.math.transformListToTransform(tlist).matrix;
            tlist.clear();
            path.removeAttribute("transform");
            var segList = path.pathSegList;
            
            // Opera/win/non-EN throws an error here.
            // TODO: Find out why!
            // Presumed fixed in Opera 10.5, so commented out for now
            
//          try {
                var len = segList.numberOfItems;
//          } catch(err) {
//              var fixed_d = pathActions.convertPath(path);
//              path.setAttribute('d', fixed_d);
//              segList = path.pathSegList;
//              var len = segList.numberOfItems;
//          }
            var i, last_x, last_y;

            for (i = 0; i < len; ++i) {
                var seg = segList.getItem(i);
                var type = seg.pathSegType;
                if (type == 1) {continue;}
                var pts = [];
                $.each(['',1,2], function(j, n) {
                    var x = seg['x'+n], y = seg['y'+n];
                    if (x !== undefined && y !== undefined) {
                        var pt = svgedit.math.transformPoint(x, y, m);
                        pts.splice(pts.length, 0, pt.x, pt.y);
                    }
                });
                svgedit.path.replacePathSeg(type, i, pts, path);
            }
            
            reorientGrads(path, m);
        },
        zoomChange: function() {
            if (current_mode == "pathedit") {
                svgedit.path.path.update();
            }
        },
        getNodePoint: function() {
            var sel_pt = svgedit.path.path.selected_pts.length ? svgedit.path.path.selected_pts[0] : 1;

            var seg = svgedit.path.path.segs[sel_pt];
            return {
                x: seg.item.x,
                y: seg.item.y,
                type: seg.type
            };
        }, 
        linkControlPoints: function(linkPoints) {
            svgedit.path.setLinkControlPoints(linkPoints);
        },
        clonePathNode: function() {
            svgedit.path.path.storeD();
            
            var sel_pts = svgedit.path.path.selected_pts;
            var segs = svgedit.path.path.segs;
            
            var i = sel_pts.length;
            var nums = [];

            while (i--) {
                var pt = sel_pts[i];
                svgedit.path.path.addSeg(pt);
                
                nums.push(pt + i);
                nums.push(pt + i + 1);
            }
            svgedit.path.path.init().addPtsToSelection(nums);

            svgedit.path.path.endChanges("Clone path node(s)");
        },
        opencloseSubPath: function() {
            var sel_pts = svgedit.path.path.selected_pts;
            // Only allow one selected node for now
            if (sel_pts.length !== 1) {return;}
            
            var elem = svgedit.path.path.elem;
            var list = elem.pathSegList;

            var len = list.numberOfItems;

            var index = sel_pts[0];
            
            var open_pt = null;
            var start_item = null;

            // Check if subpath is already open
            svgedit.path.path.eachSeg(function(i) {
                if (this.type === 2 && i <= index) {
                    start_item = this.item;
                }
                if (i <= index) {return true;}
                if (this.type === 2) {
                    // Found M first, so open
                    open_pt = i;
                    return false;
                }
                if (this.type === 1) {
                    // Found Z first, so closed
                    open_pt = false;
                    return false;
                }
            });
            
            if (open_pt == null) {
                // Single path, so close last seg
                open_pt = svgedit.path.path.segs.length - 1;
            }

            if (open_pt !== false) {
                // Close this path
                
                // Create a line going to the previous "M"
                var newseg = elem.createSVGPathSegLinetoAbs(start_item.x, start_item.y);
            
                var closer = elem.createSVGPathSegClosePath();
                if (open_pt == svgedit.path.path.segs.length - 1) {
                    list.appendItem(newseg);
                    list.appendItem(closer);
                } else {
                    svgedit.path.insertItemBefore(elem, closer, open_pt);
                    svgedit.path.insertItemBefore(elem, newseg, open_pt);
                }
                
                svgedit.path.path.init().selectPt(open_pt+1);
                return;
            }
            
            // M 1,1 L 2,2 L 3,3 L 1,1 z // open at 2,2
            // M 2,2 L 3,3 L 1,1
            
            // M 1,1 L 2,2 L 1,1 z M 4,4 L 5,5 L6,6 L 5,5 z 
            // M 1,1 L 2,2 L 1,1 z [M 4,4] L 5,5 L(M)6,6 L 5,5 z 
            
            var seg = svgedit.path.path.segs[index];
            
            if (seg.mate) {
                list.removeItem(index); // Removes last "L"
                list.removeItem(index); // Removes the "Z"
                svgedit.path.path.init().selectPt(index - 1);
                return;
            }
            
            var i, last_m, z_seg;
            
            // Find this sub-path's closing point and remove
            for (i = 0; i<list.numberOfItems; i++) {
                var item = list.getItem(i);

                if (item.pathSegType === 2) {
                    // Find the preceding M
                    last_m = i;
                } else if (i === index) {
                    // Remove it
                    list.removeItem(last_m);
//                      index--;
                } else if (item.pathSegType === 1 && index < i) {
                    // Remove the closing seg of this subpath
                    z_seg = i-1;
                    list.removeItem(i);
                    break;
                }
            }
            
            var num = (index - last_m) - 1;
            
            while (num--) {
                svgedit.path.insertItemBefore(elem, list.getItem(last_m), z_seg);
            }
            
            var pt = list.getItem(last_m);
            
            // Make this point the new "M"
            svgedit.path.replacePathSeg(2, last_m, [pt.x, pt.y]);
            
            i = index; // i is local here, so has no effect; what is the reason for this?
            
            svgedit.path.path.init().selectPt(0);
        },
        deletePathNode: function() {
            if (!pathActions.canDeleteNodes) {return;}
            svgedit.path.path.storeD();
            
            var sel_pts = svgedit.path.path.selected_pts;
            var i = sel_pts.length;

            while (i--) {
                var pt = sel_pts[i];
                svgedit.path.path.deleteSeg(pt);
            }
            
            // Cleanup
            var cleanup = function() {
                var segList = svgedit.path.path.elem.pathSegList;
                var len = segList.numberOfItems;
                
                var remItems = function(pos, count) {
                    while (count--) {
                        segList.removeItem(pos);
                    }
                };

                if (len <= 1) {return true;}
                
                while (len--) {
                    var item = segList.getItem(len);
                    if (item.pathSegType === 1) {
                        var prev = segList.getItem(len-1);
                        var nprev = segList.getItem(len-2);
                        if (prev.pathSegType === 2) {
                            remItems(len-1, 2);
                            cleanup();
                            break;
                        } else if (nprev.pathSegType === 2) {
                            remItems(len-2, 3);
                            cleanup();
                            break;
                        }

                    } else if (item.pathSegType === 2) {
                        if (len > 0) {
                            var prev_type = segList.getItem(len-1).pathSegType;
                            // Path has M M
                            if (prev_type === 2) {
                                remItems(len-1, 1);
                                cleanup();
                                break;
                            // Entire path ends with Z M 
                            } else if (prev_type === 1 && segList.numberOfItems-1 === len) {
                                remItems(len, 1);
                                cleanup();
                                break;
                            }
                        }
                    }
                }   
                return false;
            };
            
            cleanup();
            
            // Completely delete a path with 1 or 0 segments
            if (svgedit.path.path.elem.pathSegList.numberOfItems <= 1) {
                pathActions.toSelectMode(svgedit.path.path.elem);
                canvas.deleteSelectedElements();
                return;
            }
            
            svgedit.path.path.init();
            svgedit.path.path.clearSelection();
            
            // TODO: Find right way to select point now
            // path.selectPt(sel_pt);
            if (window.opera) { // Opera repaints incorrectly
                var cp = $(svgedit.path.path.elem); 
                cp.attr('d', cp.attr('d'));
            }
            svgedit.path.path.endChanges("Delete path node(s)");
        },
        smoothPolylineIntoPath: smoothPolylineIntoPath,
        setSegType: function(v) {
            svgedit.path.path.setSegType(v);
        },
        moveNode: function(attr, newValue) {
            var sel_pts = svgedit.path.path.selected_pts;
            if (!sel_pts.length) {return;}
            
            svgedit.path.path.storeD();
            
            // Get first selected point
            var seg = svgedit.path.path.segs[sel_pts[0]];
            var diff = {x:0, y:0};
            diff[attr] = newValue - seg.item[attr];
            
            seg.move(diff.x, diff.y);
            svgedit.path.path.endChanges("Move path point");
        },
        fixEnd: function(elem) {
            // Adds an extra segment if the last seg before a Z doesn't end
            // at its M point
            // M0,0 L0,100 L100,100 z
            var segList = elem.pathSegList;
            var len = segList.numberOfItems;
            var i, last_m;
            for (i = 0; i < len; ++i) {
                var item = segList.getItem(i);
                if (item.pathSegType === 2) {
                    last_m = item;
                }
                
                if (item.pathSegType === 1) {
                    var prev = segList.getItem(i-1);
                    if (prev.x != last_m.x || prev.y != last_m.y) {
                        // Add an L segment here
                        var newseg = elem.createSVGPathSegLinetoAbs(last_m.x, last_m.y);
                        svgedit.path.insertItemBefore(elem, newseg, i);
                        // Can this be done better?
                        pathActions.fixEnd(elem);
                        break;
                    }
                    
                }
            }
            if (svgedit.browser.isWebkit()) {resetD(elem);}
        },
        // Convert a path to one with only absolute or relative values
        convertPath: function(path, toRel) {
            var i;
            var segList = path.pathSegList;
            var len = segList.numberOfItems;
            var curx = 0, cury = 0;
            var d = "";
            var last_m = null;
            
            for (i = 0; i < len; ++i) {
                var seg = segList.getItem(i);
                // if these properties are not in the segment, set them to zero
                var x = seg.x || 0,
                    y = seg.y || 0,
                    x1 = seg.x1 || 0,
                    y1 = seg.y1 || 0,
                    x2 = seg.x2 || 0,
                    y2 = seg.y2 || 0;
    
                var type = seg.pathSegType;
                var letter = pathMap[type]['to'+(toRel?'Lower':'Upper')+'Case']();
                
                var addToD = function(pnts, more, last) {
                    var str = '';
                    more = more ? ' ' + more.join(' ') : '';
                    last = last ? ' ' + svgedit.units.shortFloat(last) : '';
                    $.each(pnts, function(i, pnt) {
                        pnts[i] = svgedit.units.shortFloat(pnt);
                    });
                    d += letter + pnts.join(' ') + more + last;
                };
                
                switch (type) {
                    case 1: // z,Z closepath (Z/z)
                        d += "z";
                        break;
                    case 12: // absolute horizontal line (H)
                        x -= curx;
                    case 13: // relative horizontal line (h)
                        if (toRel) {
                            curx += x;
                            letter = 'l';
                        } else {
                            x += curx;
                            curx = x;
                            letter = 'L';
                        }
                        // Convert to "line" for easier editing
                        addToD([[x, cury]]);
                        break;
                    case 14: // absolute vertical line (V)
                        y -= cury;
                    case 15: // relative vertical line (v)
                        if (toRel) {
                            cury += y;
                            letter = 'l';
                        } else {
                            y += cury;
                            cury = y;
                            letter = 'L';
                        }
                        // Convert to "line" for easier editing
                        addToD([[curx, y]]);
                        break;
                    case 2: // absolute move (M)
                    case 4: // absolute line (L)
                    case 18: // absolute smooth quad (T)
                        x -= curx;
                        y -= cury;
                    case 5: // relative line (l)
                    case 3: // relative move (m)
                        // If the last segment was a "z", this must be relative to 
                        if (last_m && segList.getItem(i-1).pathSegType === 1 && !toRel) {
                            curx = last_m[0];
                            cury = last_m[1];
                        }
                    
                    case 19: // relative smooth quad (t)
                        if (toRel) {
                            curx += x;
                            cury += y;
                        } else {
                            x += curx;
                            y += cury;
                            curx = x;
                            cury = y;
                        }
                        if (type === 3) {last_m = [curx, cury];}
                        
                        addToD([[x, y]]);
                        break;
                    case 6: // absolute cubic (C)
                        x -= curx; x1 -= curx; x2 -= curx;
                        y -= cury; y1 -= cury; y2 -= cury;
                    case 7: // relative cubic (c)
                        if (toRel) {
                            curx += x;
                            cury += y;
                        } else {
                            x += curx; x1 += curx; x2 += curx;
                            y += cury; y1 += cury; y2 += cury;
                            curx = x;
                            cury = y;
                        }
                        addToD([[x1, y1], [x2, y2], [x, y]]);
                        break;
                    case 8: // absolute quad (Q)
                        x -= curx; x1 -= curx;
                        y -= cury; y1 -= cury;
                    case 9: // relative quad (q) 
                        if (toRel) {
                            curx += x;
                            cury += y;
                        } else {
                            x += curx; x1 += curx;
                            y += cury; y1 += cury;
                            curx = x;
                            cury = y;
                        }
                        addToD([[x1, y1],[x, y]]);
                        break;
                    case 10: // absolute elliptical arc (A)
                        x -= curx;
                        y -= cury;
                    case 11: // relative elliptical arc (a)
                        if (toRel) {
                            curx += x;
                            cury += y;
                        } else {
                            x += curx;
                            y += cury;
                            curx = x;
                            cury = y;
                        }
                        addToD([[seg.r1, seg.r2]], [
                                seg.angle,
                                (seg.largeArcFlag ? 1 : 0),
                                (seg.sweepFlag ? 1 : 0)
                            ], [x, y]
                        );
                        break;
                    case 16: // absolute smooth cubic (S)
                        x -= curx; x2 -= curx;
                        y -= cury; y2 -= cury;
                    case 17: // relative smooth cubic (s)
                        if (toRel) {
                            curx += x;
                            cury += y;
                        } else {
                            x += curx; x2 += curx;
                            y += cury; y2 += cury;
                            curx = x;
                            cury = y;
                        }
                        addToD([[x2, y2],[x, y]]);
                        break;
                } // switch on path segment type
            } // for each segment
            return d;
        }
    };
}();