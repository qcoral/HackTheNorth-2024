extends Control

@export_file("*.json") var d_file

var dialogue = []
var current_dialogue_id = 0
var d_active = false

func _ready():
	$NinePatchRect.visible = false
	
func start():
	if d_active:
		return
	d_active = true
	dialogue = load_dialogue()
	current_dialogue_id = -1
	next_script()
	
func load_dialogue():
	var file = FileAccess.open("res://dialogue/worker_dialogue1.json", FileAccess.READ)
	var content = JSON.parse_string(file.get_as_text())
	return content

func _input(event):
	if event.is_action_pressed("ui_accept"):
		next_script()
		

func next_script(): # change this part later for ai
	$NinePatchRect.visible = !$NinePatchRect.visible

	current_dialogue_id += 1
	if current_dialogue_id >= len(dialogue):
		return
		
	$NinePatchRect/Name.text = dialogue[current_dialogue_id]['name']
	$NinePatchRect/Text.text = dialogue[current_dialogue_id]['text']
