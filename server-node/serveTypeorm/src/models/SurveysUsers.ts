import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'
import { Surveys } from "./Surveys"
import { User } from "./User"

@Entity("surveys_users")
class SurveysUsers {
    @PrimaryColumn()
    readonly id: string

    @Column()
    user_id: string

    @Column()
    surveys_id: string

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { SurveysUsers }

