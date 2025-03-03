/* eslint-disable @typescript-eslint/no-explicit-any */
import { UniqueEntityID } from './value-object/unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this._id) {
      return true
    }

    return false
  }
}
