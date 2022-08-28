package com.messaging.mechat.collection.users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Setter
public class ChatDetails {

    private List<String> groupsChats;
    private List<String > privateChats;

}
