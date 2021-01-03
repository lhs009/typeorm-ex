import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Group } from './entity/Group';
import { User } from './entity/User';

(async () => {
  let conn = null;
  try {
    conn = await createConnection();

    const groups: Group[] = [
      await Group.create({
        name: '탁구 동호회',
      }).save(),
      await Group.create({
        name: '골프 동호회',
      }).save(),
    ];

    const user = await User.create({
      email: 'sionlaonlove@naver.com',
      password: 'kljsdjfsadfjsf',
      groups,
    }).save();

    console.log(await User.find({ relations: ['groups'] }));
    console.log(await Group.find({ relations: ['users'] }));

    console.log(user);
    await user.remove();
  } catch (error) {
    console.log(error);
  } finally {
    console.log('db disconnect');
    if (conn) await conn.close();
  }
})();

// return getRepository().createQueryBuilder('todo')
// .where('todo."isComplete" = :value', { value: false })
// .getMany();

// const todoRepository = getRepository(Todo);
//   return getRepository().createQueryBuilder('todo')
//     .where('todo."isComplete" = :value', { value: false })
//     .getMany();
