$(document).ready(function() {
	let taskToEdit = null; // Stores the reference to the task being edited

	// Function to add a new task
	const addTask = () => {
		const taskInputValue = $("#taskInput").val().trim();
		if (taskInputValue !== "") {
			const listItem = $("<li>").append("<span class='task-text'>" + taskInputValue + "</span>");
			listItem.append("<span class='delete'>Delete</span>");
			listItem.append("<span class='edit'>Edit</span>");
			$("#taskList").append(listItem);
			$("#taskInput").val(""); // Clear the input field
		}
	};

	// Event handler for the Add button
	$("#addButton").click(() => {
		addTask();
	});

	// Event handler for pressing Enter key in the input field
	$("#taskInput").keypress(event => {
		if (event.which === 13) { // Enter key code
			addTask();
		}
	});

	// Event handler for clicking on a task (to mark it as completed)
	$("#taskList").on("click", ".task-text", function() {
		$(this).parent().toggleClass("completed");
	});

	// Event handler for clicking on the Delete button
	$("#taskList").on("click", ".delete", function() {
		$(this).parent().remove();
	});

	// Event handler for clicking on the Edit button
	$("#taskList").on("click", ".edit", function() {
		const listItem = $(this).prev(".delete").prev(".task-text");
		const taskText = listItem.text();
		taskToEdit = listItem; // Store the reference to the task being edited
		$("#editTaskInput").val(taskText); // Set the initial value in the modal input field
		$("#myModal").css("display", "block"); // Show the modal
	});

	// Event handler for closing the modal
	$(".close").click(function() {
		$("#myModal").css("display", "none"); // Hide the modal
	});

	// Event handler for saving the edited task
	$("#saveButton").click(function() {
		const editedTask = $("#editTaskInput").val().trim();
		if (editedTask !== "") {
			taskToEdit.text(editedTask); // Update the task text
			$("#myModal").css("display", "none"); // Hide the modal
		}
	});

	// Event handler for preventing default form submission
	$("form").submit(function(event) {
		event.preventDefault();
	});
});
