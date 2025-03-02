package com.github.szysza26.projectmanager.task;

import org.springframework.stereotype.Component;

@Component
public class TaskConverter {

	public TaskSummaryDTO taskToTaskSummaryDTO(Task task) {
		return new TaskSummaryDTO(task.getId (), task.getProjectId (), task.getName (), task.getCreatedAt (),
								  task.getCreatedBy (), task.getStatus ());
	}

	public TaskDetailedDTO taskToTaskDetailedDTO(Task task) {
		return new TaskDetailedDTO(task.getId (), task.getProjectId (), task.getName (), task.getDescription (),
								   task.getCreatedAt (), task.getCreatedBy (), task.getStatus ());
	}
}
