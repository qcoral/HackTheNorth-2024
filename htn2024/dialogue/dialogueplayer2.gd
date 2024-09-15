extends Control

@export_file("*.json") var d_file
@onready var http_request = $"hacker-npc/Dialogue/HTTPRequest"

var url = "http://localhost:3000/npcresponse"
var id = 0
var d_active = false
var audio_path= "res://audioupload/recording.wav"

func _ready():
	http_request.request_completed.connect(_on_request_completed)
	$NinePatchRect.visible = false
	
func send_request():
	var file = File.new()
	if file.file_exists(audio_path):
		file.open(audio_fpath, File.READ)
		var audio_data = file.get_buffer(file.get_len())
		file.close()
		
		var boundary = "---------------------------GodotBoundary"
		var body = ""
		body += "--" + boundary + "\r\n"
		body += 'Content-Disposition: form-data; name="id"\r\n\r\n'
		body += id + "\r\n"
		body += "--" + boundary + "\r\n"
		body += 'Content-Disposition: form-data; name="audio"; filename="asktojoin.m4a"\r\n'
		body += "Content-Type: audio/mp4\r\n\r\n"
		body = body.to_utf8_buffer()
		body.append_array(audio_data)
		body.append_string("\r\n--" + boundary + "--\r\n")

		var headers = [
			"Content-Type: multipart/form-data; boundary=" + boundary
		]

		http_request.request(url, headers, false, HTTPClient.METHOD_POST, body)
	else:
		print("File not found: %s" % audio_file_path)
	
	
func _on_request_completed(results, response_code, headers, body):
	print("Response Code: %s" % str(response_code))
	print("Response Body: %s" % body.get_string_from_utf8())
	
func start_convo(id):
	record_audio()
	send_request()
	load_dialogue(response)
	
	
func record_audio():
	
	# TODO, record audio
	
	

func _input(event):
	if event.is_action_pressed("ui_accept"):
		start_convo()
		

func load_dialogue(response):
	$NinePatchRect.visible = !$NinePatchRect.visible

	current_dialogue_id += 1
	if current_dialogue_id >= len(dialogue):
		return
		
	$NinePatchRect/Name.text = names
	$NinePatchRect/Text.text = dialogue[current_dialogue_id]['text']
