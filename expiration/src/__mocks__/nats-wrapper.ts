//faking the nats-wrapper.ts for testing purpose.
//creating the environment just as nets-wrapper with the data it has used

export const natsWrapper: any = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
