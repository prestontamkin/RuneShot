enum AttackState {
    AttackWaiting,
    AttackCharging
};

private var motor : CharacterMotor;
private var attackTimer : float;
private var chargeTimer : float;
private var attackState : AttackState = AttackState.AttackWaiting;

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
    attackTimer = Random.Range(2.0f, 4.0f);
}

// Update is called once per frame
function Update () {
    var wpns = GetComponent(Weapons);
    if (wpns != null) {
        switch (attackState) {
            case AttackState.AttackCharging: 
                chargeTimer -= Time.deltaTime;
                if (chargeTimer <= 0.0f) {
                    wpns.EndPowerCalc();
                    attackState = AttackState.AttackWaiting;
                    attackTimer = Random.Range(2.0f, 4.0f);
                }
                break;
            
            case AttackState.AttackWaiting:
                attackTimer -= Time.deltaTime;
                if (attackTimer <= 0.0f) {
                    wpns.StartPowerCalc();
                    attackState = AttackState.AttackCharging;
                    chargeTimer = Random.Range(2.0f, 4.0f);
                }
            
        }
    }    
    /*

	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
	}
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = transform.rotation * directionVector;
	motor.inputJump = Input.GetButton("Jump");
    */
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/Non Player Controller")
