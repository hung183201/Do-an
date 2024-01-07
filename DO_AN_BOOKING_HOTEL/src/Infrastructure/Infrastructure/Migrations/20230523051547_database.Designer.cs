﻿// <auto-generated />
using System;
using Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Migrations
{
    [DbContext(typeof(DBBOOKINGHOTELContext))]
    [Migration("20230523051547_database")]
    partial class database
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Entities.AppRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AppRoles");
                });

            modelBuilder.Entity("Domain.Entities.AppUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Dob")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AppUsers");
                });

            modelBuilder.Entity("Domain.Entities.Booking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CheckIn")
                        .HasColumnType("datetime")
                        .HasColumnName("CHECK_IN");

                    b.Property<string>("CheckOut")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .HasColumnName("CHECK_OUT")
                        .IsFixedLength(true);

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdUser")
                        .HasColumnType("int")
                        .HasColumnName("ID_USER");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NOTE");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<decimal?>("TotalPrice")
                        .HasColumnType("decimal(18,0)")
                        .HasColumnName("TOTAL_PRICE");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("IdUser");

                    b.HasIndex("UserId");

                    b.ToTable("BOOKING");
                });

            modelBuilder.Entity("Domain.Entities.Hotel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("ADDRESS");

                    b.Property<int?>("CategoryHotel")
                        .HasColumnType("int")
                        .HasColumnName("CATEGORY_HOTEL");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameHotel")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("NAME_HOTEL");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NOTE");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("HOTEL");
                });

            modelBuilder.Entity("Domain.Entities.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("IMAGE_NAME");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("URL");

                    b.HasKey("Id");

                    b.ToTable("IMAGES");
                });

            modelBuilder.Entity("Domain.Entities.ImageHotelRoom", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("IdHotelOrRoom")
                        .HasColumnType("int")
                        .HasColumnName("ID_HOTEL_OR_ROOM");

                    b.Property<int?>("IdImage")
                        .HasColumnType("int")
                        .HasColumnName("ID_IMAGE");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdHotelOrRoom");

                    b.HasIndex("IdImage");

                    b.ToTable("IMAGE_HOTEL_ROOM");
                });

            modelBuilder.Entity("Domain.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdRoomType")
                        .HasColumnType("int")
                        .HasColumnName("ID_ROOM_TYPE");

                    b.Property<string>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("IMAGE");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int")
                        .HasColumnName("STATUS");

                    b.HasKey("Id");

                    b.HasIndex("IdRoomType");

                    b.ToTable("ROOM");
                });

            modelBuilder.Entity("Domain.Entities.RoomBooking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("IdBooking")
                        .HasColumnType("int")
                        .HasColumnName("ID_BOOKING");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdRoomType")
                        .HasColumnType("int")
                        .HasColumnName("ID_ROOM_TYPE");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18,0)")
                        .HasColumnName("PRICE");

                    b.HasKey("Id");

                    b.HasIndex("IdBooking");

                    b.HasIndex("IdRoomType");

                    b.ToTable("ROOM_BOOKING");
                });

            modelBuilder.Entity("Domain.Entities.RoomType", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("ExtraBed")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .HasColumnName("EXTRA_BED")
                        .IsFixedLength(true);

                    b.Property<int?>("IdHotel")
                        .HasColumnType("int")
                        .HasColumnName("ID_HOTEL");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("MaxPeople")
                        .HasColumnType("int")
                        .HasColumnName("MAX_PEOPLE");

                    b.Property<string>("NameRoomType")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .HasColumnName("NAME_ROOM_TYPE")
                        .IsFixedLength(true);

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("Price")
                        .HasColumnType("decimal(18,0)")
                        .HasColumnName("PRICE");

                    b.Property<string>("Size")
                        .HasMaxLength(10)
                        .HasColumnType("nchar(10)")
                        .HasColumnName("SIZE")
                        .IsFixedLength(true);

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("TotalBed")
                        .HasColumnType("int")
                        .HasColumnName("TOTAL_BED");

                    b.Property<int?>("TotalRoom")
                        .HasColumnType("int")
                        .HasColumnName("TOTAL_ROOM");

                    b.HasKey("Id");

                    b.HasIndex("IdHotel");

                    b.ToTable("ROOM_TYPES");
                });

            modelBuilder.Entity("Domain.Entities.RoomUtility", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("IdRoomTypes")
                        .HasColumnType("int")
                        .HasColumnName("ID_ROOM_TYPES");

                    b.Property<int?>("IdUtilities")
                        .HasColumnType("int")
                        .HasColumnName("ID_UTILITIES");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("IdRoomTypes");

                    b.HasIndex("IdUtilities");

                    b.ToTable("ROOM_UTILITIES");
                });

            modelBuilder.Entity("Domain.Entities.UserClient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("EMAIL");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameClient")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("NAME_CLIENT");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)")
                        .HasColumnName("PASSWORD");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("USER_CLIENT");
                });

            modelBuilder.Entity("Domain.Entities.Utility", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Icon")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)")
                        .HasColumnName("ICON");

                    b.Property<string>("IdNguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IdNguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameUtilities")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("NAME_UTILITIES");

                    b.Property<DateTime?>("NgayCapNhat")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("NgayTao")
                        .HasColumnType("datetime2");

                    b.Property<string>("NguoiCapNhat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NguoiTao")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("UtilitiesType")
                        .HasColumnType("int")
                        .HasColumnName("UTILITIES_TYPE");

                    b.HasKey("Id");

                    b.ToTable("UTILITIES");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("RoleClaim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("UserClaim");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserLogin");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RoleId");

                    b.ToTable("UserRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserToken");
                });

            modelBuilder.Entity("Domain.Entities.Booking", b =>
                {
                    b.HasOne("Domain.Entities.UserClient", "IdUserNavigation")
                        .WithMany("Bookings")
                        .HasForeignKey("IdUser")
                        .HasConstraintName("FK_BOOKING_USER_CLIENT");

                    b.HasOne("Domain.Entities.AppUser", "AppUser")
                        .WithMany("Bookings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");

                    b.Navigation("IdUserNavigation");
                });

            modelBuilder.Entity("Domain.Entities.ImageHotelRoom", b =>
                {
                    b.HasOne("Domain.Entities.Hotel", "IdHotelOrRoomNavigation")
                        .WithMany("ImageHotelRooms")
                        .HasForeignKey("IdHotelOrRoom")
                        .HasConstraintName("FK_IMAGE_HOTEL_ROOM_HOTEL");

                    b.HasOne("Domain.Entities.Image", "IdImageNavigation")
                        .WithMany("ImageHotelRooms")
                        .HasForeignKey("IdImage")
                        .HasConstraintName("FK_IMAGE_HOTEL_ROOM_IMAGES");

                    b.Navigation("IdHotelOrRoomNavigation");

                    b.Navigation("IdImageNavigation");
                });

            modelBuilder.Entity("Domain.Entities.Room", b =>
                {
                    b.HasOne("Domain.Entities.RoomType", "IdRoomTypeNavigation")
                        .WithMany("Rooms")
                        .HasForeignKey("IdRoomType")
                        .HasConstraintName("FK_ROOM_ROOM_TYPES");

                    b.Navigation("IdRoomTypeNavigation");
                });

            modelBuilder.Entity("Domain.Entities.RoomBooking", b =>
                {
                    b.HasOne("Domain.Entities.Booking", "IdBookingNavigation")
                        .WithMany("RoomBookings")
                        .HasForeignKey("IdBooking")
                        .HasConstraintName("FK_ROOM_BOOKING_BOOKING");

                    b.HasOne("Domain.Entities.RoomType", "IdRoomTypeNavigation")
                        .WithMany("RoomBookings")
                        .HasForeignKey("IdRoomType")
                        .HasConstraintName("FK_ROOM_BOOKING_ROOM");

                    b.Navigation("IdBookingNavigation");

                    b.Navigation("IdRoomTypeNavigation");
                });

            modelBuilder.Entity("Domain.Entities.RoomType", b =>
                {
                    b.HasOne("Domain.Entities.ImageHotelRoom", "IdRoomTypeNavigation")
                        .WithOne("RoomType")
                        .HasForeignKey("Domain.Entities.RoomType", "Id")
                        .HasConstraintName("FK_ROOM_TYPES_IMAGE_HOTEL_ROOM")
                        .IsRequired();

                    b.HasOne("Domain.Entities.Hotel", "IdHotelNavigation")
                        .WithMany("RoomTypes")
                        .HasForeignKey("IdHotel")
                        .HasConstraintName("FK_ROOM_TYPES_HOTEL");

                    b.Navigation("IdHotelNavigation");

                    b.Navigation("IdRoomTypeNavigation");
                });

            modelBuilder.Entity("Domain.Entities.RoomUtility", b =>
                {
                    b.HasOne("Domain.Entities.RoomType", "IdRoomTypesNavigation")
                        .WithMany("RoomUtilities")
                        .HasForeignKey("IdRoomTypes")
                        .HasConstraintName("FK_ROOM_UTILITIES_ROOM_TYPES");

                    b.HasOne("Domain.Entities.Utility", "IdUtilitiesNavigation")
                        .WithMany("RoomUtilities")
                        .HasForeignKey("IdUtilities")
                        .HasConstraintName("FK_ROOM_UTILITIES_UTILITIES");

                    b.Navigation("IdRoomTypesNavigation");

                    b.Navigation("IdUtilitiesNavigation");
                });

            modelBuilder.Entity("Domain.Entities.AppUser", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("Domain.Entities.Booking", b =>
                {
                    b.Navigation("RoomBookings");
                });

            modelBuilder.Entity("Domain.Entities.Hotel", b =>
                {
                    b.Navigation("ImageHotelRooms");

                    b.Navigation("RoomTypes");
                });

            modelBuilder.Entity("Domain.Entities.Image", b =>
                {
                    b.Navigation("ImageHotelRooms");
                });

            modelBuilder.Entity("Domain.Entities.ImageHotelRoom", b =>
                {
                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("Domain.Entities.RoomType", b =>
                {
                    b.Navigation("RoomBookings");

                    b.Navigation("Rooms");

                    b.Navigation("RoomUtilities");
                });

            modelBuilder.Entity("Domain.Entities.UserClient", b =>
                {
                    b.Navigation("Bookings");
                });

            modelBuilder.Entity("Domain.Entities.Utility", b =>
                {
                    b.Navigation("RoomUtilities");
                });
#pragma warning restore 612, 618
        }
    }
}
