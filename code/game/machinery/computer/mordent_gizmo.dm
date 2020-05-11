/obj/machinery/computer/mordent_gizmo
	name = "strange gizmo"
	desc = "A device that seems to be for testing something."
	circuit = /obj/item/circuitboard/computer/mordent_gizmo
	ui_x = 350
	ui_y = 300

/obj/machinery/computer/mordent_gizmo/ui_interact(mob/user, ui_key = "main", datum/tgui/ui = null, force_open = FALSE, datum/tgui/master_ui = null, datum/ui_state/state = GLOB.default_state)
	ui = SStgui.try_update_ui(user, src, ui_key, ui, force_open)
	if (!ui)
		ui = new(user, src, ui_key, "MordentGizmo", name, ui_x, ui_y, master_ui, state)
		ui.open()

/obj/machinery/computer/mordent_gizmo/ui_data(mob/user)
	var/list/data = list()
	return data

/obj/machinery/computer/mordent_gizmo/ui_act(action, params)
	if (..())
		return
