package com.github.szysza26.projectmanager.project;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor @Getter @Setter
public class Project {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String name;
	private String description;
	private Boolean active = Boolean.FALSE;
	@CreationTimestamp
	@Column(updatable = false)
	private LocalDateTime createdAt;
	private String createdBy;
}
