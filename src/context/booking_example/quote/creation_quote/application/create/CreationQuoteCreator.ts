import { inject, injectable } from "inversify";
import CreationQuote, { CreationQuoteProps } from "../../domain/CreationQuote";
import CreationQuoteRepository from "../../domain/CreationQuoteRepository";
import Log from "@utils/decorators/Log";
import CreationQuoteTypes from "../../CreationQuoteTypes";

@injectable()
export default class CreationQuoteCreator {

  constructor (
    @inject( CreationQuoteTypes.CreationQuoteRepository ) private readonly creationQuoteRepository: CreationQuoteRepository
  ) { }

  @Log()
  async create ( props: CreationQuoteCreatorProps ) {
    const creationQuote = CreationQuote.create( props );
    await this.creationQuoteRepository.save( creationQuote );
  }
}

export type CreationQuoteCreatorProps = Omit<CreationQuoteProps, "status">;