package com.github.szysza26.projectmanager.task;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
public class TaskController {

	private final TaskService taskService;

	@GetMapping("/tasks/project/{projectId}")
	public List<TaskSummaryDTO> indexTasksForProject(@PathVariable Long projectId) {
		return taskService.getTasksForProject (projectId);
	}

	@GetMapping("/tasks/{taskId}")
	public TaskDetailedDTO showTask(@PathVariable Long taskId) {
		return taskService.getTask (taskId);
	}

	@PostMapping ("/tasks/project/{projectId}")
	public TaskDetailedDTO createTask(@PathVariable Long projectId,
									  @Valid @RequestBody CreateTaskRequest createTaskRequest) {
		return taskService.createTask (projectId, createTaskRequest);
	}

	@PutMapping("/tasks/{taskId}")
	public TaskDetailedDTO updateTask(@PathVariable Long taskId,
									  @Valid @RequestBody CreateTaskRequest createTaskRequest) {
		return taskService.updateTask (taskId, createTaskRequest);
	}

	@DeleteMapping("/tasks/{taskId}")
	public void deleteTask(@PathVariable Long taskId) {
		taskService.deleteTask (taskId);
	}
}