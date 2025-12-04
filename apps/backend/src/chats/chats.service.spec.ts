import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { PrismaService } from '../prisma.service';

describe('ChatsService', () => {
  let service: ChatsService;

  const mockPrismaService = {
    chat: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    message: {
      create: jest.fn(),
    },
  };

  const mockLLMProvider = {
    generateCompletion: jest.fn().mockResolvedValue('Mock AI response'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'LLM_PROVIDER', useValue: mockLLMProvider },
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a chat', async () => {
    const mockChat = { id: '1', userId: 'user1', title: 'Test Chat', createdAt: new Date(), updatedAt: new Date() };
    mockPrismaService.chat.create.mockResolvedValue(mockChat);

    const result = await service.createChat('user1', 'Test Chat');
    expect(result).toEqual(mockChat);
    expect(mockPrismaService.chat.create).toHaveBeenCalledWith({
      data: { userId: 'user1', title: 'Test Chat' },
    });
  });

  it('should get chats by user', async () => {
    const mockChats = [{ id: '1', userId: 'user1', title: 'Test Chat', createdAt: new Date(), updatedAt: new Date() }];
    mockPrismaService.chat.findMany.mockResolvedValue(mockChats);

    const result = await service.getChatsByUser('user1');
    expect(result).toEqual(mockChats);
  });
});
