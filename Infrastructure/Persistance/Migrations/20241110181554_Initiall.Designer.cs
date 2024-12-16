﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Persistance.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20241110181554_Initiall")]
    partial class Initiall
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Category.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("InCountry")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("in_country");

                    b.Property<string>("Material")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("material");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<string>("Size")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("size");

                    b.HasKey("Id")
                        .HasName("pk_categories");

                    b.ToTable("categories", (string)null);
                });

            modelBuilder.Entity("Domain.History.History", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<DateTime>("DataReceived")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("data_received")
                        .HasDefaultValueSql("timezone('utc', now())");

                    b.Property<Guid>("ParcelId")
                        .HasColumnType("uuid")
                        .HasColumnName("parcel_id");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_histories");

                    b.HasIndex("ParcelId")
                        .HasDatabaseName("ix_histories_parcel_id");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_histories_user_id");

                    b.ToTable("histories", (string)null);
                });

            modelBuilder.Entity("Domain.Parcels.Parcel", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("AddresToCome")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("addres_to_come");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid")
                        .HasColumnName("category_id");

                    b.Property<DateTime>("DateOfShipment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date_of_shipment")
                        .HasDefaultValueSql("timezone('utc', now())");

                    b.Property<Guid>("ReceiverId")
                        .HasColumnType("uuid")
                        .HasColumnName("receiver_id");

                    b.Property<string>("TrackNumber")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("track_number");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid")
                        .HasColumnName("user_id");

                    b.Property<string>("Weight")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("weight");

                    b.HasKey("Id")
                        .HasName("pk_parcels");

                    b.HasIndex("CategoryId")
                        .HasDatabaseName("ix_parcels_category_id");

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_parcels_user_id");

                    b.ToTable("parcels", (string)null);
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("first_name");

                    b.Property<bool>("IsAdmin")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasDefaultValue(false)
                        .HasColumnName("is_admin");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("last_name");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("login");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("password");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("phone_number");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Domain.History.History", b =>
                {
                    b.HasOne("Domain.Parcels.Parcel", "Parcel")
                        .WithMany()
                        .HasForeignKey("ParcelId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_histories_parcels_parcel_id");

                    b.HasOne("Domain.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_histories_users_user_id");

                    b.Navigation("Parcel");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Parcels.Parcel", b =>
                {
                    b.HasOne("Domain.Category.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_parcels_categories_category_id");

                    b.HasOne("Domain.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_parcels_users_user_id");

                    b.Navigation("Category");

                    b.Navigation("User");
                });
#pragma warning restore 612, 618
        }
    }
}
