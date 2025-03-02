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
public class TaskSummaryDTO {

	private Long id;
	private Long projectId;
	private String name;
	private LocalDateTime createdAt;
	private String createdBy;
	private Status status;
}
