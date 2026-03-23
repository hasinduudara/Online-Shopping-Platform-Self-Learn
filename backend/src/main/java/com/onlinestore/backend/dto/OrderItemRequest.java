package com.onlinestore.backend.dto;

public record OrderItemRequest(Long productId, Integer quantity) {
}
