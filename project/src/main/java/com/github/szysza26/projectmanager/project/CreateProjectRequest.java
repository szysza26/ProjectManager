package com.github.szysza26.projectmanager.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProjectRequest {

	@Size(min = 3, max = 255)
	private String name;
	@NotBlank
	private String description;
}
