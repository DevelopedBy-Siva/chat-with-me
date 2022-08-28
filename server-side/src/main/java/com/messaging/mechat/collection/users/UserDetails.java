package com.messaging.mechat.collection.users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.OffsetDateTime;
import java.util.List;

@ToString
@Getter
@Setter
@Document(collection = "Users")
public class UserDetails {

    @Id
    private String id;
    @Indexed(unique = true)
    private String email;
    private String name;
    private String phone;
    private String password;
    private String avatar;
    private String joined;
    private List<String> blockedUsers;
    private List<String> chatIds;
    private UserSettings settings;

    public UserDetails() {
        this.joined = OffsetDateTime.now().toString();
    }

}
