package com.messaging.mechat.collection.users;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class UserSettings {

    private boolean showLastSeen;
    private int chatPurgeDays;

}
