package com.onlinestore.backend.service;

import org.springframework.stereotype.Service;

@Service
public class PaymentService {

	public boolean processPayment(Double amount) {
		try {
			Thread.sleep(1500);
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			return false;
		}
		return Math.random() > 0.2;
	}
}
