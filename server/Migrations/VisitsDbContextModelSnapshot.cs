﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Visits.Core.DatabaseContext;

namespace Server.Migrations
{
    [DbContext(typeof(VisitsDbContext))]
    partial class VisitsDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("Visits.Models.PatientModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("city")
                        .HasColumnType("text");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("firstName")
                        .HasColumnType("text");

                    b.Property<string>("identityNumber")
                        .HasColumnType("text");

                    b.Property<string>("interview")
                        .HasColumnType("text");

                    b.Property<string>("lastName")
                        .HasColumnType("text");

                    b.Property<string>("phoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("postalCode")
                        .HasColumnType("text");

                    b.Property<string>("street")
                        .HasColumnType("text");

                    b.Property<string>("streetNumber")
                        .HasColumnType("text");

                    b.Property<int>("userId")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.HasIndex("userId");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("Visits.Models.UserModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("email")
                        .HasColumnType("text");

                    b.Property<string>("firstName")
                        .HasColumnType("text");

                    b.Property<string>("lastName")
                        .HasColumnType("text");

                    b.Property<string>("password")
                        .HasColumnType("text");

                    b.Property<string>("passwordResetKey")
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Visits.Models.VisitMeasurementModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("name")
                        .HasColumnType("text");

                    b.Property<string>("value")
                        .HasColumnType("text");

                    b.Property<int?>("visitid")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.HasIndex("visitid");

                    b.ToTable("VisitMeasurements");
                });

            modelBuilder.Entity("Visits.Models.VisitMedicamentModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("dose")
                        .HasColumnType("text");

                    b.Property<string>("duration")
                        .HasColumnType("text");

                    b.Property<string>("name")
                        .HasColumnType("text");

                    b.Property<int?>("visitid")
                        .HasColumnType("integer");

                    b.HasKey("id");

                    b.HasIndex("visitid");

                    b.ToTable("VisitMedicaments");
                });

            modelBuilder.Entity("Visits.Models.VisitModel", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .UseIdentityByDefaultColumn();

                    b.Property<DateTime?>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("description")
                        .HasColumnType("text");

                    b.Property<bool>("isCompleted")
                        .HasColumnType("boolean");

                    b.Property<int>("patientId")
                        .HasColumnType("integer");

                    b.Property<string>("recommendations")
                        .HasColumnType("text");

                    b.Property<int>("userId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("visitDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("visitDateEnd")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("visitDateStart")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("id");

                    b.HasIndex("patientId");

                    b.HasIndex("userId");

                    b.ToTable("Visits");
                });

            modelBuilder.Entity("Visits.Models.PatientModel", b =>
                {
                    b.HasOne("Visits.Models.UserModel", "user")
                        .WithMany("patients")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("Visits.Models.VisitMeasurementModel", b =>
                {
                    b.HasOne("Visits.Models.VisitModel", "visit")
                        .WithMany("measurements")
                        .HasForeignKey("visitid");

                    b.Navigation("visit");
                });

            modelBuilder.Entity("Visits.Models.VisitMedicamentModel", b =>
                {
                    b.HasOne("Visits.Models.VisitModel", "visit")
                        .WithMany("medicaments")
                        .HasForeignKey("visitid");

                    b.Navigation("visit");
                });

            modelBuilder.Entity("Visits.Models.VisitModel", b =>
                {
                    b.HasOne("Visits.Models.PatientModel", "patient")
                        .WithMany("visits")
                        .HasForeignKey("patientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Visits.Models.UserModel", "user")
                        .WithMany("visits")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("patient");

                    b.Navigation("user");
                });

            modelBuilder.Entity("Visits.Models.PatientModel", b =>
                {
                    b.Navigation("visits");
                });

            modelBuilder.Entity("Visits.Models.UserModel", b =>
                {
                    b.Navigation("patients");

                    b.Navigation("visits");
                });

            modelBuilder.Entity("Visits.Models.VisitModel", b =>
                {
                    b.Navigation("measurements");

                    b.Navigation("medicaments");
                });
#pragma warning restore 612, 618
        }
    }
}
