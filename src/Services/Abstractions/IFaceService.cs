using System;
using System.Threading;
using System.Threading.Tasks;
using MagicMedia.Store;

namespace MagicMedia.Face
{
    public interface IFaceService
    {
        Task<MediaFace> ApproveComputerAsync(Guid id, CancellationToken cancellationToken);

        Task<MediaFace> AssignPersonByHumanAsync(
            Guid faceId,
            string personName,
            CancellationToken cancellationToken);

        Task DeleteAsync(Guid id, CancellationToken cancellationToken);

        Task<MediaFace> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<MediaThumbnail> GetThumbnailAsync(Guid id, CancellationToken cancellationToken);
        Task<(MediaFace face, bool hasMatch)> PredictPersonAsync(
            Guid faceId,
            double? distance,
            CancellationToken cancellationToken);

        Task<MediaFace> UnAssignPersonAsync(Guid id, CancellationToken cancellationToken);
    }
}
