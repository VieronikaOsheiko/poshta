using Apii.Controllers;
using Apii.Dtos;
using Application.Common.Interfaces.Queries;
using Application.Users.Commands;
using Domain;
using Domain.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PoshtaTestu.Tests.Data;
using Xunit;

namespace PoshtaTestu
{
    public class UsersDataTests
    {
        private readonly Mock<ISender> _mockSender;
        private readonly Mock<IUserQueries> _mockUserQueries;
        private readonly UsersController _controller;

        public UsersControllerTests()
        {
            _mockSender = new Mock<ISender>();
            _mockUserQueries = new Mock<IUserQueries>();
            _controller = new UsersController(_mockSender.Object, _mockUserQueries.Object);
        }

        [Fact]
        public async Task Create_ShouldReturnCreatedUser_WhenValidRequest()
        {
            // Arrange
            var userDto = new UserDto
            {
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = 1234567890,
                Login = "john_doe",
                Password = "password123"
            };

            var createdUser = new User(new UserId(Guid.NewGuid()), userDto.FirstName, userDto.LastName,
                userDto.PhoneNumber, userDto.Login, userDto.Password);

            _mockSender
                .Setup(s => s.Send(It.IsAny<CreateUserCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<User>(createdUser));

            // Act
            var result = await _controller.Create(userDto, CancellationToken.None);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedUserDto = Assert.IsType<UserDto>(okResult.Value);
            Assert.Equal(userDto.FirstName, returnedUserDto.FirstName);
        }

        [Fact]
        public async Task Update_ShouldReturnUpdatedUser_WhenValidRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var userDto = new UserDto
            {
                FirstName = "Updated",
                LastName = "User",
                PhoneNumber = 9876543210
            };

            var updatedUser = new User(new UserId(userId), userDto.FirstName, userDto.LastName, userDto.PhoneNumber,
                "existingLogin", "existingPassword");

            _mockSender
                .Setup(s => s.Send(It.IsAny<UpdateUserCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<User>(updatedUser));

            // Act
            var result = await _controller.Update(userId, userDto, CancellationToken.None);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedUserDto = Assert.IsType<UserDto>(okResult.Value);
            Assert.Equal(userDto.FirstName, returnedUserDto.FirstName);
        }

        [Fact]
        public async Task Delete_ShouldReturnDeletedUser_WhenValidUserId()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var deletedUser = new User(new UserId(userId), "Deleted", "User", 1234567890, "deleted_user", "password");

            _mockSender
                .Setup(s => s.Send(It.IsAny<DeleteUserCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new Result<User>(deletedUser));

            // Act
            var result = await _controller.Delete(userId, CancellationToken.None);

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDto>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnedUserDto = Assert.IsType<UserDto>(okResult.Value);
            Assert.Equal(deletedUser.Login, returnedUserDto.Login);
        }
    }

}