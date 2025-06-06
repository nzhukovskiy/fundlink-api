import { User } from "../../user/user"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm"
import { Roles } from "../../constants/roles"
import { Investment } from "../../../investments/entities/investment/investment"
import { Startup } from "../../startups/entities/startup.entity"

@Entity()
export class Investor extends User {
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({nullable: true})
    title: string;

    @Column({ nullable: true })
    logoPath: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    joinedAt: Date;

    @OneToMany(() => Investment, (investment) => investment.investor)
    investments: Investment[];

    @ManyToMany(() => Startup)
    @JoinTable()
    interestingStartups: Startup[]

    getRole(): Roles {
        return Roles.INVESTOR;
    }
}
