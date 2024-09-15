extends CharacterBody2D

func _ready():
	randomize()


		# Create a timer node
	var timer: Timer = Timer.new()
	# Add it to the scene as a child of this node
	add_child(timer)
	# Configure the timer
	timer.wait_time = 1.0 # How long we're waiting
	timer.one_shot = false # trigger once or multiple times
	# Connect its timeout signal to a function we want called
	timer.timeout.connect(_on_Timer_timeout)
	# Start the timer
	timer.start()

enum {
	IDLE,
	NEW_DIR,
	MOVE
}

const speed = 60
var current_state = IDLE
var dir = Vector2.RIGHT

func _process(delta):


	match current_state:
		IDLE:
			pass
		NEW_DIR:
			dir = choose([Vector2.RIGHT, Vector2.LEFT, Vector2.UP, Vector2.DOWN])
		MOVE:
			move(delta)

func move(delta):
	position += dir * speed * delta

func choose(array):
	array.shuffle()
	return array.front()

func _on_Timer_timeout():

	$Timer.wait_time = choose([0.5, 1, 1.5])
	current_state = choose([IDLE, NEW_DIR, MOVE])

