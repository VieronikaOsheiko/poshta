using Domain.Parcels;
using Domain.Users;

namespace Application.Users.Exceptions;

public abstract class ParcelException(ParcelId id, string message, Exception? innerException = null)
    : Exception(message, innerException)
{
    public ParcelId ParcelId { get; } = id;
}

public class ParcelNotFoundException(ParcelId id) : ParcelException(id, $"Parcel under id: {id} not found");

public class ParcelAlreadyExistsException(ParcelId id) : ParcelException(id, $"Parcel already exists: {id}");

public class ParcelTrackNumberAlreadyExistsException(int trackNumber) 
    : ParcelException(ParcelId.Empty(), $"Parcel with TrackNumber: {trackNumber} already exists");

public class UserParcelNotFoundException(UserId userId) 
    : ParcelException(ParcelId.Empty(), $"User under id: {userId} not found");

public class ParcelUnknownException(ParcelId id, Exception innerException)
    : ParcelException(id, $"Unknown exception for the parcel under id: {id}", innerException);