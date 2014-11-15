/*globals svgEditor */
svgEditor.readLang({
	lang: "bg",
	dir : "ltr",
	common: {
		"ok": "Спасявам",
		"cancel": "Отказ",
		"key_backspace": "backspace", 
		"key_del": "delete", 
		"key_down": "down", 
		"key_up": "up", 
		"more_opts": "More Options",
		"url": "URL",
		"width": "Width",
		"height": "Height"
	},
	misc: {
		"powered_by": "Powered by"
	}, 
	ui: {
		"toggle_stroke_tools": "Show/hide more stroke tools",
		"palette_info": "Кликнете, за да промени попълнете цвят, на смени, кликнете да променят цвета си удар",
		"zoom_level": "Промяна на ниво на мащабиране",
		"panel_drag": "Drag left/right to resize side panel"
	},
	properties: {
		"id": "Identify the element",
		"fill_color": "Промяна попълнете цвят",
		"stroke_color": "Промяна на инсулт цвят",
		"stroke_style": "Промяна на стила удар тире",
		"stroke_width": "Промяна на ширината инсулт",
		"pos_x": "Change X coordinate",
		"pos_y": "Change Y coordinate",
		"linecap_butt": "Linecap: Butt",
		"linecap_round": "Linecap: Round",
		"linecap_square": "Linecap: Square",
		"linejoin_bevel": "Linejoin: Bevel",
		"linejoin_miter": "Linejoin: Miter",
		"linejoin_round": "Linejoin: Round",
		"angle": "Промяна ъгъл на завъртане",
		"blur": "Change gaussian blur value",
		"opacity": "Промяна на избрания елемент непрозрачност",
		"circle_cx": "CX Промяна кръг на координатната",
		"circle_cy": "Промяна кръг&#39;s CY координира",
		"circle_r": "Промяна кръг радиус",
		"ellipse_cx": "Промяна на елипса&#39;s CX координира",
		"ellipse_cy": "Промяна на елипса&#39;s CY координира",
		"ellipse_rx": "Промяна на елипса&#39;s X радиус",
		"ellipse_ry": "Промяна на елипса&#39;s Y радиус",
		"line_x1": "Промяна на линия, започваща х координира",
		"line_x2": "Промяна на линията приключва х координира",
		"line_y1": "Промяна линия, започваща Y координира",
		"line_y2": "Промяна на линията приключва Y координира",
		"rect_height": "Промяна на правоъгълник височина",
		"rect_width": "Промяна на правоъгълник ширина",
		"corner_radius": "Промяна на правоъгълник Corner Radius",
		"image_width": "Промяна на изображението ширина",
		"image_height": "Промяна на изображението височина",
		"image_url": "Промяна на URL",
		"node_x": "Change node's x coordinate",
		"node_y": "Change node's y coordinate",
		"seg_type": "Change Segment type",
		"straight_segments": "Straight",
		"curve_segments": "Curve",
		"text_contents": "Промяна на текст съдържание",
		"font_family": "Промяна на шрифта Семейство",
		"font_size": "Промени размера на буквите",
		"bold": "Получер текст",
		"italic": "Курсив текст"
	},
	tools: { 
		"main_menu": "Main Menu",
		"bkgnd_color_opac": "Промяна на цвета на фона / непрозрачност",
		"connector_no_arrow": "No arrow",
		"fitToContent": "Fit към съдържание",
		"fit_to_all": "Побери цялото съдържание",
		"fit_to_canvas": "Fit на платно",
		"fit_to_layer_content": "Fit да слой съдържание",
		"fit_to_sel": "Fit за подбор",
		"align_relative_to": "Привеждане в сравнение с ...",
		"relativeTo": "в сравнение с:",
		"страница": "страница",
		"largest_object": "най-големият обект",
		"selected_objects": "избраните обекти",
		"smallest_object": "най-малката обект",
		"new_doc": "Ню Имидж",
		"open_doc": "Отворете изображението",
		"export_img": "Export",
		"save_doc": "Save Image",
		"import_doc": "Import SVG",
		"align_to_page": "Align Element to Page",
		"align_bottom": "Привеждане Отдолу",
		"align_center": "Подравняване в средата",
		"align_left": "Подравняване вляво",
		"align_middle": "Привеждане в Близкия",
		"align_right": "Подравняване надясно",
		"align_top": "Привеждане Топ",
		"mode_select": "Select Tool",
		"mode_fhpath": "Pencil Tool",
		"mode_line": "Line Tool",
		"mode_connect": "Connect two objects",
		"mode_rect": "Rectangle Tool",
		"mode_square": "Square Tool",
		"mode_fhrect": "Свободен Употребявани правоъгълник",
		"mode_ellipse": "Елипса",
		"mode_circle": "Кръгът",
		"mode_fhellipse": "Свободен Употребявани Елипса",
		"mode_path": "Поли Tool",
		"mode_shapelib": "Shape library",
		"mode_text": "Текст Оръдие",
		"mode_image": "Image Tool",
		"mode_zoom": "Zoom Tool",
		"mode_eyedropper": "Eye Dropper Tool",
		"no_embed": "NOTE: This image cannot be embedded. It will depend on this path to be displayed",
		"undo": "Отмени",
		"redo": "Възстановяване",
		"tool_source": "Редактиране Източник",
		"wireframe_mode": "Wireframe Mode",
		"toggle_grid": "Show/Hide Grid",
		"clone": "Clone Element(s)",
		"del": "Delete Element(s)",
		"group_elements": "Група Елементи",
		"make_link": "Make (hyper)link",
		"set_link_url": "Set link URL (leave empty to remove)",
		"to_path": "Convert to Path",
		"reorient_path": "Reorient path",
		"ungroup": "Разгрупирай Елементи",
		"docprops": "Document Properties",
		"imagelib": "Image Library",
		"move_bottom": "Премести надолу",
		"move_top": "Премести в началото",
		"node_clone": "Clone Node",
		"node_delete": "Delete Node",
		"node_link": "Link Control Points",
		"add_subpath": "Add sub-path",
		"openclose_path": "Open/close sub-path",
		"source_save": "Спасявам",
		"cut": "Cut",
		"copy": "Copy",
		"paste": "Paste",
		"paste_in_place": "Paste in Place",
		"delete": "Delete",
		"group": "Group",
		"move_front": "Bring to Front",
		"move_up": "Bring Forward",
		"move_down": "Send Backward",
		"move_back": "Send to Back"
	},
	layers: {
		"layer":"Layer",
		"layers": "Layers",
		"del": "Изтриване на слой",
		"move_down": "Move слой надолу",
		"new": "Нов слой",
		"rename": "Преименуване Layer",
		"move_up": "Move Up Layer",
		"dupe": "Duplicate Layer",
		"merge_down": "Merge Down",
		"merge_all": "Merge All",
		"move_elems_to": "Move elements to:",
		"move_selected": "Move selected elements to a different layer"
	},
	config: {
		"image_props": "Image Properties",
		"doc_title": "Title",
		"doc_dims": "Canvas Dimensions",
		"included_images": "Included Images",
		"image_opt_embed": "Embed data (local files)",
		"image_opt_ref": "Use file reference",
		"editor_prefs": "Editor Preferences",
		"icon_size": "Icon size",
		"language": "Language",
		"background": "Editor Background",
		"editor_img_url": "Image URL",
		"editor_bg_note": "Note: Background will not be saved with image.",
		"icon_large": "Large",
		"icon_medium": "Medium",
		"icon_small": "Small",
		"icon_xlarge": "Extra Large",
		"select_predefined": "Изберете предварително:",
		"units_and_rulers": "Units & Rulers",
		"show_rulers": "Show rulers",
		"base_unit": "Base Unit:",
		"grid": "Grid",
		"snapping_onoff": "Snapping on/off",
		"snapping_stepsize": "Snapping Step-Size:",
		"grid_color": "Grid color"
	},
	shape_cats: {
		"basic": "Basic",
		"object": "Objects",
		"symbol": "Symbols",
		"arrow": "Arrows",
		"flowchart": "Flowchart",
		"animal": "Animals",
		"game": "Cards & Chess",
		"dialog_balloon": "Dialog balloons",
		"electronics": "Electronics",
		"math": "Mathematical",
		"music": "Music",
		"misc": "Miscellaneous",
		"raphael_1": "raphaeljs.com set 1",
		"raphael_2": "raphaeljs.com set 2"
	},
	imagelib: {
		"select_lib": "Select an image library",
		"show_list": "Show library list",
		"import_single": "Import single",
		"import_multi": "Import multiple",
		"open": "Open as new document"
	},
	notification: {
		"invalidAttrValGiven":"Invalid value given",
		"noContentToFitTo":"No content to fit to",
		"dupeLayerName":"There is already a layer named that!",
		"enterUniqueLayerName":"Please enter a unique layer name",
		"enterNewLayerName":"Please enter the new layer name",
		"layerHasThatName":"Layer already has that name",
		"QmoveElemsToLayer":"Move selected elements to layer '%s'?",
		"QwantToClear":"Do you want to clear the drawing?\nThis will also erase your undo history!",
		"QwantToOpen":"Do you want to open a new file?\nThis will also erase your undo history!",
		"QerrorsRevertToSource":"There were parsing errors in your SVG source.\nRevert back to original SVG source?",
		"QignoreSourceChanges":"Ignore changes made to SVG source?",
		"featNotSupported":"Feature not supported",
		"enterNewImgURL":"Enter the new image URL",
		"defsFailOnSave": "NOTE: Due to a bug in your browser, this image may appear wrong (missing gradients or elements). It will however appear correct once actually saved.",
		"loadingImage":"Loading image, please wait...",
		"saveFromBrowser": "Select \"Save As...\" in your browser to save this image as a %s file.",
		"noteTheseIssues": "Also note the following issues: ",
		"unsavedChanges": "There are unsaved changes.",
		"enterNewLinkURL": "Enter the new hyperlink URL",
		"errorLoadingSVG": "Error: Unable to load SVG data",
		"URLloadFail": "Unable to load from URL",
		"retrieving": "Retrieving \"%s\"..."
	},
	confirmSetStorage: {
		message: "By default and where supported, SVG-Edit can store your editor "+
		"preferences and SVG content locally on your machine so you do not "+
		"need to add these back each time you load SVG-Edit. If, for privacy "+
		"reasons, you do not wish to store this information on your machine, "+
		"you can change away from the default option below.",
		storagePrefsAndContent: "Store preferences and SVG content locally",
		storagePrefsOnly: "Only store preferences locally",
		storagePrefs: "Store preferences locally",
		storageNoPrefsOrContent: "Do not store my preferences or SVG content locally",
		storageNoPrefs: "Do not store my preferences locally",
		rememberLabel: "Remember this choice?",
		rememberTooltip: "If you choose to opt out of storage while remembering this choice, the URL will change so as to avoid asking again."
	}
});