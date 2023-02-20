const messages = (contact) => {
  const data = [
    {
      contact: "duke nukem",
      messages: [
        {
          sender: "siva",
          message: "h",
          timestamp: new Date("2022-12-18T09:30:54.01"),
        },
        {
          sender: "siva",
          message: "hello man 1",
          timestamp: new Date("2022-12-18T09:30:51.01"),
        },
        {
          sender: "duke nukem",
          message: "heelo man 3",
          timestamp: new Date("2022-12-18T09:30:53.01"),
        },
        {
          sender: "duke nukem",
          message:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          timestamp: new Date("2022-12-17T09:29:51.01"),
        },
        {
          sender: "duke nukem",
          message: "hello man 2",
          timestamp: new Date("2022-12-18T09:30:52.01"),
        },

        {
          sender: "duke nukem",
          message: "hello man 5",
          timestamp: new Date("2022-12-17T09:30:51.01"),
        },
        {
          sender: "siva",
          message: "hello man 7",

          timestamp: new Date("2022-11-18T09:30:55.01"),
        },
        {
          sender: "siva",
          message: "hallo man 8",
          timestamp: new Date("2022-10-18T09:20:55.01"),
        },
      ],
    },
  ];

  let detail = data.filter((i) => i.contact === contact);
  if (detail[0]) return detail[0].messages;
  return [];
};

export { messages };
