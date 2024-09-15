extends CharacterBody2D


const speed = 300

var current_dir = "none"

func _physics_process(delta):
	player_movement(delta) 

func player_movement(delta):
	
	if Input.is_action_pressed("right"):
		velocity.x = speed
		velocity.y = 0
		current_dir = "right"
		
		
	elif Input.is_action_pressed("left"):
		velocity.x = -speed
		velocity.y = 0
		current_dir = "left"
	
	elif Input.is_action_pressed("up"):
		velocity.x = 0
		velocity.y = -speed
		current_dir = "up"
		
	elif Input.is_action_pressed("down"):
		velocity.x = 0
		velocity.y = speed
		current_dir = "down"
	
	else:
		velocity.x = 0
		velocity.y = 0
	
	move_and_slide()
