package com.github.szysza26.projectmanager.task;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Task {

	@Id
	@GeneratedValue (strategy= GenerationType.AUTO)
	private Long id;
	private Long projectId;
	private String name;
	private String description;
	@Enumerated(EnumType.STRING) // Store as a string in the database
	private Status status = Status.OPEN;
	@CreationTimestamp
	@Column (updatable = false)
	private LocalDateTime createdAt;
	private String createdBy;
}
