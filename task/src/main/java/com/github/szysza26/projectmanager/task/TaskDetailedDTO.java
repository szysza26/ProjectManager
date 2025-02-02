package com.github.szysza26.projectmanager.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TaskDetailedDTO {

	private Long id;
	private Long projectId;
	private String name;
	private String description;
	private LocalDateTime createdAt;
	private Status status;
}
