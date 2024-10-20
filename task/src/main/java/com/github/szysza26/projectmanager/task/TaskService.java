package com.github.szysza26.projectmanager.task;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {

	private final TaskRepository taskRepository;
	private final TaskConverter taskConverter;

	List<TaskSummaryDTO> getTasksForProject(Long projectId) {
		List<Task> tasks = taskRepository.findByProjectId (projectId);
		return tasks.stream ().map (taskConverter::taskToTaskSummaryDTO).toList ();
	}

	public TaskDetailedDTO getTask(Long taskId) {
		Task task = taskRepository.findById (taskId)
				.orElseThrow (() -> new RuntimeException ("Task not found"));

		return taskConverter.taskToTaskDetailedDTO (task);
	}

	public TaskDetailedDTO createTask(Long projectId, CreateTaskRequest createTaskRequest) {
		Task task = new Task ();
		task.setProjectId (projectId);
		task.setName (createTaskRequest.getName ());
		task.setDescription (createTaskRequest.getDescription ());
		taskRepository.save (task);

		return taskConverter.taskToTaskDetailedDTO (task);
	}

	public TaskDetailedDTO updateTask(Long taskId, CreateTaskRequest createTaskRequest) {
		Task task = taskRepository.findById (taskId)
				.orElseThrow (() -> new RuntimeException ("Task not found"));

		task.setName (createTaskRequest.getName ());
		task.setDescription (createTaskRequest.getDescription ());
		taskRepository.save (task);

		return taskConverter.taskToTaskDetailedDTO (task);
	}

	public void deleteTask(Long taskId) {
		taskRepository.deleteById (taskId);
	}

	public void deleteTasksForProject(Long projectId) {
		List<Task> tasks = taskRepository.findByProjectId (projectId);
		taskRepository.deleteAll (tasks);
	}
}
