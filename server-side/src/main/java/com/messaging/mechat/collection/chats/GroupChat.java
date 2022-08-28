package com.messaging.mechat.collection.chats;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@ToString
@Getter
@Setter
@Document(collection = "GroupChats")
public class GroupChat {

    @Id
    private String id;
    private String chatId;
    private List<String> members;
    private String sender;
    private String message;
    private String createdAt;

}
