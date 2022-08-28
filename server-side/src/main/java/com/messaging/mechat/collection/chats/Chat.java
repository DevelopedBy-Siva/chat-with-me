package com.messaging.mechat.collection.chats;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
@Document(collection = "Chats")
public class Chat {

    @Id
    private String id;
    private String chatId;
    private List<ChatMember> members;
    private boolean isPrivate;
    private String lastMessageTimestamp;
    private String lastMessageId;

    public Chat() {
        this.isPrivate = true;
        this.members = new ArrayList<>();
    }

}
