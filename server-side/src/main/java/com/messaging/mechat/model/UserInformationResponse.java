package com.messaging.mechat.model;

import com.messaging.mechat.collection.users.UserSettings;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
public class UserInformationResponse {

    private String email;
    private String name;
    private String phone;
    private String password;
    private String avatar;
    private String joined;
    private List<String> blockedUsers;
    private List<String> chatIds;
    private UserSettings settings;

    public UserInformationResponse() {
        this.blockedUsers = new ArrayList<>();
        this.chatIds = new ArrayList<>();
    }
}
