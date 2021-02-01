import { useCallback, useState } from 'react';
import * as t from 'io-ts';
import { ObjectID } from 'mongodb';
import { pipe } from 'fp-ts/pipeable';
import * as TE from 'fp-ts/TaskEither';

export const issueName = t.brand(
  t.string,
  (
    n,
  ): n is t.Branded<
    string,
    {
      readonly issueName: unique symbol;
    }
  > => n.length > 2 && n.length < 50,
  'issueName',
);

export const issueDesc = t.brand(
  t.string,
  (
    n,
  ): n is t.Branded<
    string,
    {
      readonly issueDesc: unique symbol;
    }
  > => n.length > 5 && n.length < 100,
  'issueDesc',
);

export const gameSession = t.interface({
  name: issueName,
  desc: issueDesc,
});

const objectId = new t.Type<ObjectID, ObjectID, any>(
  'objectId',
  (input: any): input is ObjectID => ObjectID.isValid(input),
  (input, context) =>
    ObjectID.isValid(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);

export const withObjectId = t.interface({
  _id: objectId,
});

export const withTag = (tag: string) => t.interface({ _tag: t.literal(tag) });

export type GameSession = t.TypeOf<typeof gameSession>;

export const gameSessionDocument = t.intersection([
  gameSession,
  withObjectId,
  withTag('gameSession'),
]);


export const useCreateGame = async (input: GameSession): Promise<[boolean, string, () => TE.TaskEither<unknown, Response>]> => {
  const [gameCreated, setGameCreated] = useState(false);
  const [gameId, setGameId] = useState('');

  const createGameSessionFn = useCallback(
    () =>
      pipe(
        input,
        gameSession.decode,
        TE.fromEither,
        TE.chain((validatedInput) =>
          TE.tryCatch<unknown, Response>(
            () =>
              fetch('/api/createGame', {
                method: 'POST',
                body: JSON.stringify(validatedInput),
              }),
            (e) => e,
          ),
        ),
        TE.map((response) => {
          setGameCreated(true);
          setGameId(JSON.stringify(response));
          return response;
        }),
      ),
    [input],
  );

  return [gameCreated, gameId, createGameSessionFn];
};
