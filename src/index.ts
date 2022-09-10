import {
    Between,
    Equal,
    In,
    IsNull,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan,
    MoreThanOrEqual,
    Not,
    Raw
} from 'typeorm';
import {AppDataSource} from "./data-source"
import {User} from "./entity/User"
import {Profile} from "./entity/Profile";
import {Post} from "./entity/Post";
import {Group} from "./entity/Group";

AppDataSource.initialize().then(async () => {

    const userRepository = AppDataSource.getRepository(User);

    console.log('Loading user with id 1 from the database...');
    const user1 = await User.findOne({ where: { id: 1 }, relations: ["profile", "posts", "groups"] });
    // const user1 = await userRepository.findOneBy({ id: 1 });
    // const user1 = await AppDataSource.manager.findOneBy(User, { id: 1 });
    console.log('Current user1 : ', user1);

    console.log('Modifying name of user1...');
    if (user1) {
        user1.name = `m${user1.name}`;
        await user1.save();
        // await userRepository.save(user1);
        // await AppDataSource.manager.save(user1);
    }
    console.log('Modified user1 : ', user1);

    console.log('Deleting user1...');
    if (user1) await user1.remove();
    console.group('Deleted user1');
    console.log('profile : ', await Profile.find());
    console.log('posts : ', await Post.find());
    console.log('groups : ', await Group.find());
    console.groupEnd();
    //
    // console.log('Deleting user1.profile ...');
    // if (user1) await user1.profile.remove();
    // console.log('Deleted user1.profile -> user1 : ', await User.find());
    //
    // console.log('Deleting user1.posts[0] ...');
    // await user1.posts[0].remove();
    // console.log('Deleted user1.posts[0] -> user1 : ', await User.find());

    // console.group("Inserting a new user into the database...");
    //
    // // Insert Profile
    // const profile = new Profile();
    // profile.name = 'username';
    // profile.age = 22;
    // await profile.save();
    //
    // /**
    //  * - User 추가
    //  * - User 에 Profile 등록 (1:1)
    //  */
    // const user = new User();
    // user.password = 'password';
    // user.email = 'test4@mail.com';
    // user.name = 'username';
    // user.age = 37;
    // user.profile = profile;
    // await user.save();
    // // await userRepository.save(user);
    // // await AppDataSource.manager.save(user)
    // profile.user = user;
    // await profile.save();
    // console.log("Saved a new user with id: " + user.id);
    //
    // /**
    //  * - Post 작성 2건
    //  * - User 에 Post 등록 (1:M)
    //  */
    // const post1 = new Post();
    // post1.title = 'post1';
    // post1.content = 'content1';
    // post1.user = user;
    // await post1.save();
    // const post2 = new Post();
    // post2.title = 'post2';
    // post2.content = 'content2';
    // post2.user = user;
    // await post2.save();
    // console.log("Saved new posts: " + {post1, post2});
    //
    // /**
    //  * - Group 추가 2건
    //  * - User 를 2개 Group 에 각각 등록 (N:M)
    //  */
    // const group1 = new Group();
    // group1.name = 'group1';
    // await group1.save();
    // const group2 = new Group();
    // group2.name = 'group2';
    // await group2.save();
    // user.groups = [
    //     group1,
    //     group2,
    // ];
    // await user.save();
    // console.groupEnd();

    console.log("Loading users from the database...")
    const usersAfter = await User.find({ relations: ['profile', 'posts', 'groups'] });
    // const usersAfter = await userRepository.find();
    // const usersAfter = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", usersAfter)

    console.log("Loading groups from the database...")
    const groupsMade = await Group.find({ relations: ['users'] });
    console.log("Loaded groups : ", groupsMade);

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
