package com.onlinestore.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FakeStoreProductDto(
		Long id, String title, Double price, String description, String category, String image) {
}
