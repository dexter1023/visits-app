using Microsoft.EntityFrameworkCore;
using Visits.Models;
using System.Threading.Tasks;
using System.Linq;
using System;
using System.Threading;

namespace Visits.Core.DatabaseContext
{
    public class VisitsDbContext : DbContext
    {
        public VisitsDbContext(DbContextOptions<VisitsDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<PatientModel> Patients { get; set; }
        public DbSet<VisitModel> Visits { get; set; }
        public DbSet<VisitMeasurementModel> VisitMeasurements { get; set; }
        public DbSet<VisitMedicamentModel> VisitMedicaments { get; set; }


        public override int SaveChanges()
        {
            AddTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            AddTimestamps();
            return await base.SaveChangesAsync();
        }

        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries()
                .Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entity in entities)
            {
                var now = DateTime.UtcNow;

                if (entity.State == EntityState.Added)
                {
                    ((BaseEntity)entity.Entity).CreatedAt = now;
                }
                ((BaseEntity)entity.Entity).UpdatedAt = now;
            }
        }
    }
}
