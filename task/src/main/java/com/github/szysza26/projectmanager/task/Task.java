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
	@CreationTimestamp
	@Column (updatable = false)
	private LocalDateTime createdAt;
}
