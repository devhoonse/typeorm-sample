import {Like, Not, Equal, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Between, In, IsNull, Raw} from 'typeorm';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    const userRepository = AppDataSource.getRepository(User);

    // console.log('Loading user with id 1 from the database...');
    // const user1 = await User.findOneBy({ id: 1 });
    // // const user1 = await userRepository.findOneBy({ id: 1 });
    // // const user1 = await AppDataSource.manager.findOneBy(User, { id: 1 });
    // console.log('Current user1 : ', user1);
    //
    // console.log('Modifying name of user1...');
    // user1.name = `m${user1.name}`;
    // await user1.save();
    // // await userRepository.save(user1);
    // // await AppDataSource.manager.save(user1);
    // console.log('Modified user1 : ', user1);

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.password = 'password';
    // user.email = 'test4@mail.com';
    // user.name = 'username';
    // user.age = 37;
    // await user.save();
    // // await userRepository.save(user);
    // // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const usersAfter = await User.find();
    // const usersAfter = await userRepository.find();
    // const usersAfter = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", usersAfter)

    console.group("Querying users from the database");

    console.group('all records');
    console.log(
      'await User.find() : ',
      await User.find()
    );
    console.log(
      'await userRepository.find() : ',
      await userRepository.find()
    );
    console.log(
      'await AppDataSource.manager.find(User)',
      await AppDataSource.manager.find(User)
    );
    console.groupEnd();

    console.group('WHERE conditions');
    console.log(
      'await User.find({ where : { id: 1 }}) : ',
      await User.find({ where : { id: 1 }})
    );
    console.log(
      'await User.find({ where: { id: Equal(1) } })',
      await User.find({ where: { id: Equal(1) } })
    );
    console.groupEnd();

    console.group('select columns');
    console.log(
      'await User.find({ select: ["id", "name", "age"] }) : ',
      await User.find({ select: ["id", "name", "age"] })
    );
    console.groupEnd();

    console.group('findOne');
    // console.log(
    //   'await User.findOne(1) : ',
    //   await User.findOne(1)
    // );
    console.log(
      'await User.findOne({ where: { id: 1 }}) : ',
      await User.findOne({ where: { id: 1 }})
    );
    console.groupEnd();

    console.group('WHERE conditions with OR connections');
    console.log(
      'await User.find({where: [{ name: \'홍길동\' }, { id: 1 }]})',
      await User.find({
          where: [
            { name: '홍길동' },
            { id: 1 }
          ]
      })
    );
    console.groupEnd();

    console.group('ORDER BY');
    console.log(
      'await User.find({ order: { id: \'DESC\', name: \'asc\' } })',
      await User.find({ order: { id: 'DESC', name: 'asc' } })
    );
    console.groupEnd();

    console.group('skip and take');
    console.log(
      'await User.find({ skip: 5, take: 10 })',         // SELECT * FROM user LIMIT 5 OFFSET 2;
      await User.find({ skip: 5, take: 10 })
    );
    console.groupEnd();

    console.group('NOT');
    console.log(
      'await User.find({ where: { id: Not(1) } })',
      await User.find({ where: { id: Not(1) } })
    );
    console.groupEnd();

    console.group('LessThan / LessThanOrEqual');
    console.log(
      'await User.find({ where: { id: LessThan(36) } })',
      await User.find({ where: { id: LessThan(5) } })
    );
    console.log(
      'await User.find({ where: { id: LessThanOrEqual(36) } })',
      await User.find({ where: { id: LessThanOrEqual(5) } })
    );
    console.groupEnd();

    console.group('MoreThan / MoreThanOrEqual');
    console.log(
      'await User.find({ where: { id: MoreThan(36) } })',
      await User.find({ where: { id: MoreThan(5) } })
    );
    console.log(
      'await User.find({ where: { id: MoreThanOrEqual(36) } })',
      await User.find({ where: { id: MoreThanOrEqual(5) } })
    );
    console.groupEnd();

    console.group('LIKE');
    console.log(
      'await User.find({ where: { name: Like(\'\') } })',
      await User.find({ where: { name: Like('mm%') } })
    );
    console.groupEnd();

    console.group('BETWEEN');
    console.log(
      'await User.find({ where: { id: Between(5, 7) } })',
      await User.find({ where: { id: Between(5, 7) } })
    );
    console.groupEnd();

    console.group('IN');
    console.log(
      'await User.find({ where: { id: In([5, 8]) } })',
      await User.find({ where: { id: In([5, 8]) } })
    );
    console.groupEnd();

    console.group('IS NULL');
    console.log(
      'await User.find({ where: { deletedAt: IsNull() }})',
      await User.find({ where: { deletedAt: IsNull() }})
    );
    console.log(
      'await User.find({ where: { deletedAt: Not(IsNull()) }})',
      await User.find({ where: { deletedAt: Not(IsNull()) }})
    );
    console.groupEnd();

    console.group('Raw');
    console.log(
      'await User.find({ where: { deletedAt: Raw("deletedAt < NOW()") } })',
      await User.find({ where: { deletedAt: Raw("deletedAt < NOW()") } })
    );
    console.log(
      'await User.find({ where: { age: Raw("(SELECT `age` FROM `user` WHERE `id`=1)") } })',
      await User.find({ where: { age: Raw("(SELECT `age` FROM `user` WHERE `id`=1)") } })
    );
    console.groupEnd();

    console.group('RAW Query');
    console.log(
      'await AppDataSource.manager.query("SELECT * FROM user where id > 5")',
      await AppDataSource.manager.query("SELECT * FROM user where id > 5")
    );
    console.groupEnd();

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error));
