import { CreateCompetitionCommand } from '../../../../src/competition/application';
import { Competition } from '../../../../src/competition/domain';

export class CreateCompetitionCommandBuilder {
  public static build(competition: Competition): CreateCompetitionCommand {
    return new CreateCompetitionCommand(
      competition.ownerId.value,
      competition.name.value,
      competition.description?.value || '',
      competition.driversPerTeam.value
    );
  }
}
