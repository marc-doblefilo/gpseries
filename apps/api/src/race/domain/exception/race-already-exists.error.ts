import { Name } from '../model';

export class RaceAlreadyExists extends Error {
  public static with(name: Name): RaceAlreadyExists {
    return new RaceAlreadyExists(
      `Competition with name <${name.value}> already exists`
    );
  }
}
