package com.onlinestore.backend.dto;

import java.util.List;

public record OrderRequest(List<OrderItemRequest> items) {
}
