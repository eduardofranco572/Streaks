const mUser = {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
  
  const mHistory = {
    findFirst: jest.fn(),
    create: jest.fn(),
  };
  
  const mPrismaClient = {
    user: mUser,
    history: mHistory,
  };
  
  jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => mPrismaClient),
  }));
  
  function setupUserFind(user: any) {
    mUser.findFirst.mockResolvedValueOnce(user).mockResolvedValueOnce(user);
  }
  
  function setTestDate(dateStr: string): Date {
    const fixedDate = new Date(dateStr);
    jest.useFakeTimers().setSystemTime(fixedDate);
    return fixedDate;
  }
  
  import { updateUserStreakAndXp } from '../services/user-streak';
  
  describe('UserService - updateUserStreakAndXp', () => {
    const email = 'teste@exemplo.com';
    const externalId = 'ext123';
  
    beforeEach(() => {
      jest.clearAllMocks();
      jest.useRealTimers();
    });
  
    test('deve criar um novo usuário se nenhum for encontrado', async () => {
      mUser.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
  
      const createdUser = {
        id: 1,
        email,
        externalId,
        streaks: 1,
        totalReading: 1,
        experience: 100,
        level: 1,
      };
      mUser.create.mockResolvedValueOnce(createdUser);
      mHistory.create.mockResolvedValueOnce({ id: 1, userId: createdUser.id });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.findFirst).toHaveBeenCalledTimes(2);
      expect(mUser.create).toHaveBeenCalledWith({
        data: { email, externalId, streaks: 1, totalReading: 1, experience: 100, level: 1 },
      });
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: createdUser.id } });
    });
  
    test('deve lançar erro se usuário encontrado pelo email tiver externalId diferente', async () => {
      const userMock = {
        id: 2,
        email,
        externalId: 'outroExt',
        streaks: 1,
        totalReading: 1,
        experience: 100,
        level: 1,
      };
      setupUserFind(userMock);
  
      await expect(updateUserStreakAndXp(email, externalId)).rejects.toThrow(
        '404: Error! porfavor reabra o link no e-mail'
      );
    });
  
    test('não deve atualizar se já existir history para o dia atual', async () => {
      const userMock = {
        id: 3,
        email,
        externalId,
        streaks: 2,
        totalReading: 5,
        experience: 200,
        level: 2,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-10T12:00:00Z');
      mHistory.findFirst.mockResolvedValueOnce({ id: 10, userId: userMock.id, createdAt: fixedDate });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.update).not.toHaveBeenCalled();
      expect(mHistory.create).not.toHaveBeenCalled();
    });
  
    test('deve atualizar usuário quando diffDays === 1 (incrementa streak e xp)', async () => {
      const userMock = {
        id: 4,
        email,
        externalId,
        streaks: 2,
        totalReading: 10,
        experience: 150,
        level: 1,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-10T12:00:00Z');
  
      mHistory.findFirst.mockResolvedValueOnce(null);

      const lastHistoryDate = new Date(fixedDate);
      lastHistoryDate.setDate(lastHistoryDate.getDate() - 1);
      mHistory.findFirst.mockResolvedValueOnce({ id: 20, userId: userMock.id, createdAt: lastHistoryDate });
  
      const updatedUserAfterIncrement = {
        ...userMock,
        streaks: userMock.streaks + 1,
        totalReading: userMock.totalReading + 1,
      };
      mUser.update.mockResolvedValueOnce(updatedUserAfterIncrement);
  
      const updatedUserAfterXp = { ...updatedUserAfterIncrement, experience: 250, level: 2 };
      mUser.update.mockResolvedValueOnce(updatedUserAfterXp);
      mHistory.create.mockResolvedValueOnce({ id: 30, userId: userMock.id });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.update).toHaveBeenCalledTimes(2);
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: userMock.id } });
    });
  
    test('deve atualizar usuário quando diffDays === 2 e ontem não for domingo', async () => {
      const userMock = {
        id: 5,
        email,
        externalId,
        streaks: 3,
        totalReading: 15,
        experience: 250,
        level: 2,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-10T12:00:00Z');
  
      mHistory.findFirst.mockResolvedValueOnce(null);
      const lastHistoryDate = new Date(fixedDate);
      lastHistoryDate.setDate(lastHistoryDate.getDate() - 2);
      mHistory.findFirst.mockResolvedValueOnce({ id: 40, userId: userMock.id, createdAt: lastHistoryDate });
  
      const updatedUserAfterReset = { ...userMock, streaks: 1, totalReading: userMock.totalReading + 1 };
      mUser.update.mockResolvedValueOnce(updatedUserAfterReset);
      const updatedUserAfterXp = { ...updatedUserAfterReset, experience: 350, level: 3 };
      mUser.update.mockResolvedValueOnce(updatedUserAfterXp);
      mHistory.create.mockResolvedValueOnce({ id: 50, userId: userMock.id });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.update).toHaveBeenCalledTimes(2);
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: userMock.id } });
    });
  
    test('não deve atualizar usuário quando diffDays === 2 e ontem for domingo', async () => {
      const userMock = {
        id: 6,
        email,
        externalId,
        streaks: 3,
        totalReading: 15,
        experience: 250,
        level: 2,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-09T12:00:00Z');
      mHistory.findFirst.mockResolvedValueOnce(null);
      const lastHistoryDate = new Date(fixedDate);
      lastHistoryDate.setDate(lastHistoryDate.getDate() - 2);
      mHistory.findFirst.mockResolvedValueOnce({ id: 60, userId: userMock.id, createdAt: lastHistoryDate });
      mHistory.create.mockResolvedValueOnce({ id: 70, userId: userMock.id });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.update).not.toHaveBeenCalled();
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: userMock.id } });
    });
  
    test('deve atualizar usuário quando diffDays > 2 e atualizar personalRecord se necessário', async () => {
      const userMock = {
        id: 7,
        email,
        externalId,
        streaks: 5,
        totalReading: 20,
        experience: 300,
        level: 2,
        personalRecord: 3,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-10T12:00:00Z');
  
      mHistory.findFirst.mockResolvedValueOnce(null);
      const lastHistoryDate = new Date(fixedDate);
      lastHistoryDate.setDate(lastHistoryDate.getDate() - 3);
      mHistory.findFirst.mockResolvedValueOnce({ id: 80, userId: userMock.id, createdAt: lastHistoryDate });
  
      const updatedUserAfterReset = {
        ...userMock,
        streaks: 1,
        totalReading: userMock.totalReading + 1,
        personalRecord: userMock.streaks,
      };
      mUser.update.mockResolvedValueOnce(updatedUserAfterReset);
      const updatedUserAfterXp = { ...updatedUserAfterReset, experience: 400, level: 3 };
      mUser.update.mockResolvedValueOnce(updatedUserAfterXp);
      mHistory.create.mockResolvedValueOnce({ id: 90, userId: userMock.id });
  
      await updateUserStreakAndXp(email, externalId);
  
      expect(mUser.update).toHaveBeenCalledTimes(2);
      expect(mUser.update.mock.calls[0][0].data.personalRecord).toBe(userMock.streaks);
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: userMock.id } });
    });
  
    test('deve registrar log e criar history quando diffDays === 0', async () => {
      const userMock = {
        id: 8,
        email,
        externalId,
        streaks: 4,
        totalReading: 25,
        experience: 350,
        level: 3,
      };
      setupUserFind(userMock);
      const fixedDate = setTestDate('2023-01-10T12:00:00Z');
      
      mHistory.findFirst.mockResolvedValueOnce(null);
      mHistory.findFirst.mockResolvedValueOnce({ id: 100, userId: userMock.id, createdAt: fixedDate });
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      mHistory.create.mockResolvedValueOnce({ id: 110, userId: userMock.id });
      
      await updateUserStreakAndXp(email, externalId);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Mesmo dia, mas nenhum registro encontrado na busca por range. Isso não deveria ocorrer.'
      );
      expect(mHistory.create).toHaveBeenCalledWith({ data: { userId: userMock.id } });
      consoleSpy.mockRestore();
    });
});
  