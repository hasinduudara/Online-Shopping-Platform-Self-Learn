package com.onlinestore.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

	@Id
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private Double price;

	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false)
	private String category;

	@Column(nullable = false)
	private String image;
}
