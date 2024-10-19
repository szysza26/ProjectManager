package com.github.szysza26.projectmanager.project;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectSummaryDTO {

	private Long id;
	private String name;
	private LocalDateTime createdAt;
}
