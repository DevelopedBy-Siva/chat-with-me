package com.messaging.mechat.collection.chats;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.OffsetDateTime;

@ToString
@Getter
@Setter
public class ChatMember {

    private String userId;
    private String joinedAt;

    public ChatMember() {
        this.joinedAt = OffsetDateTime.now().toString();
    }

}
