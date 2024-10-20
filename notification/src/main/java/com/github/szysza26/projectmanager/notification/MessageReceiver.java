package com.github.szysza26.projectmanager.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageReceiver {

	@RabbitListener (queues = "${app.notification-queue-name}")
	public void listen(String message) {
		log.info (message); //TODO: send an email instead of just logging in
	}
}
