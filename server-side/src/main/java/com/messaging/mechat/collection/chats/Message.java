package com.messaging.mechat.collection.chats;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;

@ToString
@Getter
@Setter
@Document(collection = "Chats")
public class Message {

    @Id
    private String id;
    private String chatId;
    private String sender;
    private String message;
    private String createdAt;

    public Message() {
        this.createdAt = OffsetDateTime.now().toString();
    }

}
